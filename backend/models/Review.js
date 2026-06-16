const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, minlength: 5, maxlength: 500 },
  },
  { timestamps: true }
);

// One review per user per worker
reviewSchema.index({ user: 1, worker: 1 }, { unique: true });
reviewSchema.index({ worker: 1 });

// Recalculate worker rating after each review save/remove
reviewSchema.post('save', async function () {
  const Worker = require('./Worker');
  const stats = await mongoose.model('Review').aggregate([
    { $match: { worker: this.worker } },
    { $group: { _id: '$worker', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await Worker.findByIdAndUpdate(this.worker, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].count,
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
