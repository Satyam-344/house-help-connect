const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Worker = require('../models/Worker');
const { paginate, paginatedResponse } = require('../utils/pagination');

// @desc  Create a booking
// @route POST /api/bookings
const createBooking = asyncHandler(async (req, res) => {
  const { workerId, date, time, hours, address, notes, paymentMethod } = req.body;

  const worker = await Worker.findOne({ _id: workerId, isApproved: true, isDeleted: false });
  if (!worker) {
    res.status(404);
    throw new Error('Worker not found or not available');
  }

  const totalAmount = worker.hourlyRate * parseInt(hours);

  const booking = await Booking.create({
    user: req.user._id,
    worker: workerId,
    date: new Date(date),
    time,
    hours: parseInt(hours),
    address,
    notes,
    totalAmount,
    paymentMethod: paymentMethod || 'cash',
  });

  await booking.populate([
    { path: 'worker', populate: { path: 'user', select: 'name avatar phone' } },
    { path: 'user', select: 'name email phone' },
  ]);

  res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
});

// @desc  Get bookings for the logged-in user
// @route GET /api/bookings/my
const getUserBookings = asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);
  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate({ path: 'worker', populate: { path: 'user', select: 'name avatar phone' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim),
    Booking.countDocuments(filter),
  ]);

  res.json({ success: true, ...paginatedResponse(bookings, total, pg, lim) });
});

// @desc  Get bookings for the logged-in worker
// @route GET /api/bookings/worker
const getWorkerBookings = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ user: req.user._id });
  if (!worker) {
    res.status(404);
    throw new Error('Worker profile not found');
  }

  const { status, page, limit } = req.query;
  const filter = { worker: worker._id };
  if (status) filter.status = status;

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);
  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate('user', 'name avatar phone email location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim),
    Booking.countDocuments(filter),
  ]);

  res.json({ success: true, ...paginatedResponse(bookings, total, pg, lim) });
});

// @desc  Update booking status
// @route PUT /api/bookings/:id/status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  const worker = await Worker.findOne({ user: req.user._id });

  // Workers can accept/reject. Users can cancel.
  const isWorker = worker && booking.worker.toString() === worker._id.toString();
  const isUser = booking.user.toString() === req.user._id.toString();

  if (isWorker && ['accepted', 'rejected', 'completed'].includes(status)) {
    booking.status = status;
  } else if (isUser && status === 'cancelled') {
    if (!['pending', 'accepted'].includes(booking.status)) {
      res.status(400);
      throw new Error('Booking cannot be cancelled at this stage');
    }
    booking.status = 'cancelled';
  } else {
    res.status(403);
    throw new Error('Not authorized to perform this action');
  }

  const updated = await booking.save();
  res.json({ success: true, message: `Booking ${status}`, data: updated });
});

module.exports = { createBooking, getUserBookings, getWorkerBookings, updateBookingStatus };
