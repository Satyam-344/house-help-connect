const asyncHandler = require('express-async-handler');
const Worker = require('../models/Worker');
const Favorite = require('../models/Favorite');
const { uploadToCloudinary } = require('../config/cloudinary');
const { paginate, paginatedResponse } = require('../utils/pagination');

// @desc  Get all approved workers with filters
// @route GET /api/workers
const getWorkers = asyncHandler(async (req, res) => {
  const { category, city, minRating, maxRate, minExperience, gender, search, sortBy, page, limit } = req.query;

  const filter = { isApproved: true, isDeleted: false };

  if (category) filter.category = category;
  if (city) filter['location.city'] = { $regex: city, $options: 'i' };
  if (minRating) filter.rating = { $gte: parseFloat(minRating) };
  if (maxRate) filter.hourlyRate = { $lte: parseFloat(maxRate) };
  if (minExperience) filter.experience = { $gte: parseInt(minExperience) };
  if (gender) filter.gender = gender;

  const { skip, limit: lim, page: pg } = paginate(null, page, limit);

  let sortOption = { createdAt: -1 };
  if (sortBy === 'rating') sortOption = { rating: -1 };
  if (sortBy === 'price-low') sortOption = { hourlyRate: 1 };
  if (sortBy === 'price-high') sortOption = { hourlyRate: -1 };
  if (sortBy === 'experience') sortOption = { experience: -1 };

  let query = Worker.find(filter)
    .populate('user', 'name avatar phone location')
    .sort(sortOption)
    .skip(skip)
    .limit(lim);

  const [workers, total] = await Promise.all([query, Worker.countDocuments(filter)]);

  res.json({
    success: true,
    ...paginatedResponse(workers, total, pg, lim),
  });
});

// @desc  Get single worker by ID
// @route GET /api/workers/:id
const getWorkerById = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ _id: req.params.id, isDeleted: false }).populate(
    'user',
    'name avatar phone email location'
  );

  if (!worker) {
    res.status(404);
    throw new Error('Worker not found');
  }

  res.json({ success: true, data: worker });
});

// @desc  Create worker profile (for users with role=worker)
// @route POST /api/workers
const createWorkerProfile = asyncHandler(async (req, res) => {
  const existingProfile = await Worker.findOne({ user: req.user._id });
  if (existingProfile) {
    res.status(400);
    throw new Error('Worker profile already exists');
  }

  const { category, skills, languages, experience, hourlyRate, gender, age, location, availability, bio } = req.body;

  const photos = req.files?.length
    ? await Promise.all(req.files.map((f) => uploadToCloudinary(f.buffer, 'house-help-connect/workers').then((r) => r.secure_url)))
    : [];

  const worker = await Worker.create({
    user: req.user._id,
    category,
    skills: Array.isArray(skills) ? skills : skills?.split(',').map((s) => s.trim()) || [],
    languages: Array.isArray(languages) ? languages : languages?.split(',').map((l) => l.trim()) || [],
    experience: parseInt(experience) || 0,
    hourlyRate: parseFloat(hourlyRate),
    gender,
    age: parseInt(age),
    location,
    availability,
    bio: bio || '',
    photos,
  });

  res.status(201).json({ success: true, message: 'Worker profile created. Pending admin approval.', data: worker });
});

// @desc  Update worker profile
// @route PUT /api/workers/:id
const updateWorkerProfile = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ _id: req.params.id, user: req.user._id });

  if (!worker) {
    res.status(404);
    throw new Error('Worker profile not found or unauthorized');
  }

  const { category, skills, languages, experience, hourlyRate, gender, age, location, availability, bio } = req.body;

  if (category) worker.category = category;
  if (bio !== undefined) worker.bio = bio;
  if (skills) worker.skills = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim());
  if (languages) worker.languages = Array.isArray(languages) ? languages : languages.split(',').map((l) => l.trim());
  if (experience !== undefined) worker.experience = parseInt(experience);
  if (hourlyRate !== undefined) worker.hourlyRate = parseFloat(hourlyRate);
  if (gender) worker.gender = gender;
  if (age) worker.age = parseInt(age);
  if (location) worker.location = location;
  if (availability) worker.availability = { ...worker.availability, ...availability };

  if (req.files?.length) {
    const newPhotos = await Promise.all(
      req.files.map((f) => uploadToCloudinary(f.buffer, 'house-help-connect/workers').then((r) => r.secure_url))
    );
    worker.photos.push(...newPhotos);
  }

  const updated = await worker.save();
  res.json({ success: true, message: 'Profile updated', data: updated });
});

// @desc  Get current worker's own profile
// @route GET /api/workers/me
const getMyWorkerProfile = asyncHandler(async (req, res) => {
  const worker = await Worker.findOne({ user: req.user._id, isDeleted: false }).populate('user', 'name avatar email phone');

  if (!worker) {
    res.status(404);
    throw new Error('Worker profile not found');
  }

  res.json({ success: true, data: worker });
});

// @desc  Toggle favorite worker
// @route POST /api/workers/:id/favorite
const toggleFavorite = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) {
    res.status(404);
    throw new Error('Worker not found');
  }

  const existing = await Favorite.findOne({ user: req.user._id, worker: req.params.id });

  if (existing) {
    await existing.deleteOne();
    return res.json({ success: true, message: 'Removed from favorites', isFavorite: false });
  }

  await Favorite.create({ user: req.user._id, worker: req.params.id });
  res.json({ success: true, message: 'Added to favorites', isFavorite: true });
});

// @desc  Get user's favorite workers
// @route GET /api/workers/favorites
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).populate({
    path: 'worker',
    populate: { path: 'user', select: 'name avatar' },
  });

  res.json({ success: true, data: favorites.map((f) => f.worker) });
});

module.exports = { getWorkers, getWorkerById, createWorkerProfile, updateWorkerProfile, getMyWorkerProfile, toggleFavorite, getFavorites };
