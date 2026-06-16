const mongoose = require('mongoose');

const CATEGORIES = ['maid', 'cook', 'nurse', 'babysitter', 'caretaker', 'driver', 'gardener', 'housekeeper', 'elderly-care'];

const workerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    category: { type: String, required: true, enum: CATEGORIES },
    bio: { type: String, default: '' },
    skills: [{ type: String, trim: true }],
    languages: [{ type: String, trim: true }],
    experience: { type: Number, default: 0, min: 0 },
    hourlyRate: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    age: { type: Number, min: 18 },
    photos: [{ type: String }],
    availability: {
      monday: { type: Boolean, default: true },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
      startTime: { type: String, default: '08:00' },
      endTime: { type: String, default: '18:00' },
    },
    location: {
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },
    isApproved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

workerSchema.index({ category: 1, rating: -1 });
workerSchema.index({ 'location.city': 1 });
workerSchema.index({ isApproved: 1, isDeleted: 1 });

module.exports = mongoose.model('Worker', workerSchema);
