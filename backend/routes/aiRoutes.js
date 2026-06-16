const express = require('express');
const { generateBio } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate-bio', protect, generateBio);

module.exports = router;
