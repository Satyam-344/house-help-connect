const express = require('express');
const { getDashboard, getUsers, getWorkers, approveWorker, deleteUser, getBookings } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/workers', getWorkers);
router.put('/workers/:id/approve', approveWorker);
router.get('/bookings', getBookings);

module.exports = router;
