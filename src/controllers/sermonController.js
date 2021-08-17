const Sermon = require('../models/sermon');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createSermon = catchAsync(async (req, res, next) => {
  //Making a proper object from the body

  //destructuring
  const { speaker, title, bible_verse, description } = req.body;
  //1. check if all details exist
  if (!speaker || !title || !bible_verse || !description) {
    return next(new AppError('Please provide all details!!', 400));
  }
  console.log(req.body);
  const sermon = new Sermon({
    ...req.body,
    owner: req.user._id,
  });
  await sermon.save();
  res.status(201).json({
    status: 'success',
    data: {
      sermon,
    },
  });
  // next();
});

exports.userSermons = catchAsync(async (req, res, next) => {
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
      path: 'sermons',
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
    data: req.user.sermons,
  });
  next();
});

exports.searchSermon = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const sermon = await Sermon.findOne({
    _id,
    owner: req.user._id,
  });
  if (!sermon) {
    return next(new AppError('There is no such sermon', 404));
  }
  res.status(200).json({
    status: 'success',
    data: sermon,
  });
  next();
});

exports.updateSermon = catchAsync(async (req, res, next) => {
  //2. Filtered out unwanted field names not allowed to be updated
  console.log(req.body);
  if (
    !req.body.speaker ||
    !req.body.title ||
    !req.body.bible_verse ||
    !req.body.description
  ) {
    return next(new AppError('Please provide all details!!', 400));
  }
  const filteredBody = filterObj(
    req.body,
    'speaker',
    'title',
    'bible_verse',
    'description'
  );

  //3. Update sermon document
  const sermon = await Sermon.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!sermon) {
    return next(new AppError("Not Created by you! Can't update!!"));
  }

  res.status(200).json({
    status: 'success',
    data: sermon,
  });
});

exports.removeSermon = catchAsync(async (req, res, next) => {
  const sermon = await Sermon.findOneAndDelete({
    _id: req.params.id,
    // owner: req.user._id,
  });
  if (!sermon) {
    return next(new AppError('Not created by you! Not deleted!!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: sermon,
  });
});

exports.getSermons = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Sermon.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let countSermon;
  if (req.query.month <= 11) {
    countSermon = await Sermon.aggregate([
      {
        $match: { month: { $eq: Number(req.query.month) } },
      },
      {
        $group: {
          _id: 'Monthly Sermons',
          sumNum: { $sum: 1 },
        },
      },
    ]);
    if (countSermon.length > 0) {
      console.log(countSermon[0].sumNum);
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'No sermons for this month',
      });
    }
  }

  const sermon = await features.query;
  res.status(200).json({
    status: 'success',
    data: {
      countSermon,
      sermon,
    },
  });
});
