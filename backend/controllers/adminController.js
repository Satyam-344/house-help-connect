const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const { paginate, paginatedResponse } = require('../utils/pagination');

// @desc  Admin dashboard stats
// @route GET /api/admin/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const [totalUsers, totalWorkers, totalBookings, pendingWorkers, pendingBookings] = await Promise.all([
    User.countDocuments({ role: 'user', isDeleted: false }),
    Worker.countDocuments({ isDeleted: false }),
    Booking.countDocuments(),
    Worker.countDocuments({ isApproved: false, isDeleted: false }),
    Booking.countDocuments({ status: 'pending' }),
  ]);

  const recentBookings = await Booking.find()
    .populate('user', 'name')
    .populate({ path: 'worker', populate: { path: 'user', select: 'name' } })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: { totalUsers, totalWorkers, totalBookings, pendingWorkers, pendingBookings, recentBookings },
  });
});

// @desc  Get all users
// @route GET /api/admin/users
const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  const filter = { isDeleted: false };
  if (search) filter.name = { $regex: search, $options: 'i' };

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);
  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(lim),
    User.countDocuments(filter),
  ]);

  res.json({ success: true, ...paginatedResponse(users, total, pg, lim) });
});

// @desc  Get all workers (including unapproved)
// @route GET /api/admin/workers
const getWorkers = asyncHandler(async (req, res) => {
  const { page, limit, approved } = req.query;
  const filter = { isDeleted: false };
  if (approved !== undefined) filter.isApproved = approved === 'true';

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);
  const [workers, total] = await Promise.all([
    Worker.find(filter)
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim),
    Worker.countDocuments(filter),
  ]);

  res.json({ success: true, ...paginatedResponse(workers, total, pg, lim) });
});

// @desc  Approve or reject a worker
// @route PUT /api/admin/workers/:id/approve
const approveWorker = asyncHandler(async (req, res) => {
  const { isApproved } = req.body;
  const worker = await Worker.findById(req.params.id);

  if (!worker) {
    res.status(404);
    throw new Error('Worker not found');
  }

  worker.isApproved = isApproved;
  await worker.save();

  res.json({ success: true, message: isApproved ? 'Worker approved' : 'Worker approval revoked', data: worker });
});

// @desc  Soft delete a user
// @route DELETE /api/admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.isDeleted = true;
  await user.save();

  res.json({ success: true, message: 'User removed' });
});

// @desc  Get all bookings
// @route GET /api/admin/bookings
const getBookings = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);
  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate('user', 'name email')
      .populate({ path: 'worker', populate: { path: 'user', select: 'name' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim),
    Booking.countDocuments(filter),
  ]);

  res.json({ success: true, ...paginatedResponse(bookings, total, pg, lim) });
});

module.exports = { getDashboard, getUsers, getWorkers, approveWorker, deleteUser, getBookings };
