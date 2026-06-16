const express = require('express');
const { addReview, getWorkerReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);
router.get('/worker/:workerId', getWorkerReviews);
router.delete('/:id', protect, deleteReview);

module.exports = router;
