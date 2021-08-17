const News = require('../models/news');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createNews = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { title, date, description } = req.body;
  //1. check if all details exist
  if (!title || !date || !description) {
    return next(new AppError('Please provide all details!!', 400));
  }

  const news = new News({
    //using spread operator
    ...req.body,
    owner: req.user._id,
  });
  await news.save();
  res.status(201).json({
    status: 'success',
    data: {
      news,
    },
  });
});

exports.usernews = catchAsync(async (req, res, next) => {
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
      path: 'news',
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
    data: req.user.newss,
  });
  next();
});

exports.searchnews = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const news = await News.findOne({
    _id,
    owner: req.user._id,
  });
  if (!news) {
    return next(new AppError('There is no such news', 404));
  }
  res.status(200).json({
    status: 'success',
    data: news,
  });
  next();
});

exports.updatenews = catchAsync(async (req, res, next) => {
  //2. Filtered out unwanted field names not allowed to be updated
  const filteredBody = filterObj(req.body, 'title', 'date', 'description');

  //3. Update news document
  const news = await News.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: news,
  });
});

exports.removenews = catchAsync(async (req, res, next) => {
  const news = await News.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!news) {
    return next(new AppError('Not created by you! Not deleted!!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: news,
  });
  next();
});
exports.getnews = catchAsync(async (req, res, next) => {
  const news = await News.find();
  res.status(200).json({
    status: 'success',
    data: {
      news,
    },
  });
});
