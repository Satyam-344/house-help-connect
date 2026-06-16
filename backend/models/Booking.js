const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    hours: { type: Number, required: true, min: 1, max: 24 },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    notes: { type: String, default: '', maxlength: 500 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ worker: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
