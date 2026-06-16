const express = require('express');
const { createBooking, getUserBookings, getWorkerBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getUserBookings);
router.get('/worker', protect, getWorkerBookings);
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
