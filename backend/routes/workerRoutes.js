const express = require('express');
const {
  getWorkers,
  getWorkerById,
  createWorkerProfile,
  updateWorkerProfile,
  getMyWorkerProfile,
  toggleFavorite,
  getFavorites,
} = require('../controllers/workerController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getWorkers);
router.get('/me', protect, getMyWorkerProfile);
router.get('/favorites', protect, getFavorites);
router.get('/:id', getWorkerById);
router.post('/', protect, upload.array('photos', 5), createWorkerProfile);
router.put('/:id', protect, upload.array('photos', 5), updateWorkerProfile);
router.post('/:id/favorite', protect, toggleFavorite);

module.exports = router;
