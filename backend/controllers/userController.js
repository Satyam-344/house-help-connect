const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc  Get user profile
// @route GET /api/users/profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
});

// @desc  Update user profile
// @route PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, location } = req.body;

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (location) user.location = location;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, 'house-help-connect/avatars');
    user.avatar = result.secure_url;
  }

  const updated = await user.save();
  res.json({ success: true, message: 'Profile updated', data: updated });
});

module.exports = { getProfile, updateProfile };
