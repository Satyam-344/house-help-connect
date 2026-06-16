const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc  Add a review
// @route POST /api/reviews
const addReview = asyncHandler(async (req, res) => {
  const { workerId, bookingId, rating, comment } = req.body;

  // Ensure user completed a booking with this worker
  const booking = await Booking.findOne({
    _id: bookingId,
    user: req.user._id,
    worker: workerId,
    status: 'completed',
  });

  if (!booking) {
    res.status(400);
    throw new Error('You can only review workers after a completed booking');
  }

  const review = await Review.create({
    user: req.user._id,
    worker: workerId,
    booking: bookingId,
    rating: parseInt(rating),
    comment,
  });

  await review.populate('user', 'name avatar');
  res.status(201).json({ success: true, message: 'Review submitted', data: review });
});

// @desc  Get reviews for a worker
// @route GET /api/reviews/worker/:workerId
const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ worker: req.params.workerId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: reviews });
});

// @desc  Delete own review
// @route DELETE /api/reviews/:id
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user._id });

  if (!review) {
    res.status(404);
    throw new Error('Review not found or unauthorized');
  }

  await review.deleteOne();
  res.json({ success: true, message: 'Review deleted' });
});

module.exports = { addReview, getWorkerReviews, deleteReview };
