const multer = require('multer');

const ALLOWED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FORMATS.includes(file.mimetype)) {
    return cb(new Error('Only JPG, PNG, and WebP images are allowed'), false);
  }
  cb(null, true);
};

// Use memory storage — buffer is uploaded to Cloudinary in the controller
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = { upload };
