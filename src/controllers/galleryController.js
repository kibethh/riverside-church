const multer = require('multer');
const sharp = require('sharp');
const Gallery = require('../models/gallery');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Uploading for mixed fields requiring multiple images
// exports.uploadGalleryImages = upload.fields([
//   { name: 'imageCover', maxCount: 3 },
//   { name: 'images', maxCount: 3 },
// ]);
// Uploading for 1 field requiring multiple images

exports.resizeGalleryPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `member-${req.user.id}-${Date.now()}.jpeg`;
  req.file.filename = `image-${Date.now()}.jpeg`;
  // console.log(req.file.filename);

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/Gallery/${req.file.filename}`);

  next();
});
exports.uploadGalleryPhoto = upload.single('image');

exports.createGallery = catchAsync(async (req, res, next) => {
  const body = { ...req.body };
  if (!req.file) return next(new AppError('Upload an image!!', 400));
  body.image = req.file.filename;

  const { image, department, title, description } = body;
  //1. check if all details exist
  if (!image || !department || !title || !description) {
    return next(new AppError('Please provide all details!!', 400));
  }
  // console.log(body);

  const gallery = new Gallery({
    ...body,
    owner: req.user._id,
  });
  await gallery.save();
  res.status(201).json({
    status: 'success',
    data: {
      gallery,
    },
  });
});
