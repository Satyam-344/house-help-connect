const asyncHandler = require('express-async-handler');
const { generateWorkerBio } = require('../utils/aiHelper');

// @desc  Generate AI bio for a worker
// @route POST /api/ai/generate-bio
const generateBio = asyncHandler(async (req, res) => {
  const { name, category, experience, skills, languages } = req.body;

  if (!name || !category) {
    res.status(400);
    throw new Error('Name and category are required');
  }

  const bio = await generateWorkerBio({
    name,
    category,
    experience: experience || 0,
    skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s) => s.trim()).filter(Boolean),
    languages: Array.isArray(languages) ? languages : (languages || 'English').split(',').map((l) => l.trim()).filter(Boolean),
  });

  res.json({ success: true, data: { bio } });
});

module.exports = { generateBio };
