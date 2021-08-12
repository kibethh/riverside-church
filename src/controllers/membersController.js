const multer = require('multer');
const sharp = require('sharp');
const Members = require('../models/members');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.resizeMemberPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `member-${req.user.id}-${Date.now()}.jpeg`;
  req.file.filename = `member-${Date.now()}.jpeg`;
  // console.log(req.file.filename);

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/members/${req.file.filename}`);

  next();
});
exports.uploadMemberPhoto = upload.single('photo');

exports.createMembers = catchAsync(async (req, res, next) => {
  req.body = JSON.parse(JSON.stringify(req.body));

  const members = new Members({
    ...req.body,
    owner: req.user._id,
  });
  await members.save();
  res.status(201).json({
    status: 'success',
    data: {
      members,
    },
  });
  // next();
});

exports.usermembers = catchAsync(async (req, res, next) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts] = parts[1] === 'desc' ? -1 : 1;
  }

  // const tasks = await Task.find({owner: req.user.id});
  // fetching the entire profile through populate
  // finds the tasks associated with logged in user
  await req.user
    .populate({
      path: 'members',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    })
    .execPopulate();
  res.status(200).json({
    status: 'success',
    data: req.user.members,
  });
  // next();
});

exports.searchmembers = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const members = await Members.findOne({
    _id,
    owner: req.user._id,
  });
  if (!members) {
    return next(new AppError('There is no such members', 404));
  }
  res.status(200).json({
    status: 'success',
    data: members,
  });
  next();
});

exports.updatemembers = catchAsync(async (req, res, next) => {
  //2. Filtered out unwanted field names not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'member_name',
    'member_photo',
    'member_opinion'
  );

  //3. Update members document
  const members = await Members.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: members,
  });
});

exports.removemembers = catchAsync(async (req, res, next) => {
  const members = await Members.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!members) {
    return next(new AppError('No members to be deleted', 404));
  }
  res.status(200).json({
    status: 'success',
    data: members,
  });
  next();
});
exports.getmembers = catchAsync(async (req, res, next) => {
  const members = await Members.find();
  res.status(200).json({
    status: 'success',
    data: {
      members,
    },
  });
});
