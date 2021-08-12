const multer = require('multer');
const sharp = require('sharp');
const Showcase = require('../models/showcase');
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

exports.resizeShowcasePhoto = (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `Showcase-bg-${Date.now()}.jpeg`;
  req.file.filename = `showcase_bg.jpeg`;
  //   req.file.filename = `Showcase-${Date.now()}.jpeg`;
  // console.log(req.file.filename);

  sharp(req.file.buffer)
    .resize(2500, 1100)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/showcase/${req.file.filename}`);

  next();
};
exports.uploadShowcasePhoto = upload.single('photo');

exports.createShowcase = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('Choose an image!!', 400));

  const body = { ...req.body };
  body.photo = req.file.filename;
  console.log(body);
  const showcase = new Showcase({
    //using spread operator
    ...body,
    owner: req.user._id,
  });
  await showcase.save();
  res.status(201).json({
    status: 'success',
    data: {
      showcase,
    },
  });
  // next();
});
