const Event = require('../models/events');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createEvent = catchAsync(async (req, res, next) => {
  const { event_title, event_date, description } = req.body;
  //1. check if all details exist
  if (!event_title || !event_date || !description) {
    return next(new AppError('Please provide all details!!', 400));
  }

  const event = new Event({
    //using spread operator
    ...req.body,
    owner: req.user._id,
  });
  await event.save();
  res.status(201).json({
    status: 'success',
    data: {
      event,
    },
  });
  // next();
});

exports.userevent = catchAsync(async (req, res, next) => {
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
      path: 'event',
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
    data: req.user.events,
  });
  next();
});

exports.searchevent = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const event = await Event.findOne({
    _id,
    owner: req.user._id,
  });
  if (!event) {
    return next(new AppError('There is no such event', 404));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
  next();
});

exports.updateevent = catchAsync(async (req, res, next) => {
  //2. Filtered out unwanted field names not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'event_title',
    'event_date',
    'description'
  );

  //3. Update event document
  const event = await Event.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: event,
  });
});

exports.removeevent = catchAsync(async (req, res, next) => {
  const event = await Event.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!event) {
    return next(new AppError('No event to be deleted', 404));
  }
  res.status(200).json({
    status: 'success',
    data: event,
  });
  next();
});
exports.getevents = catchAsync(async (req, res, next) => {
  const event = await Event.find();
  res.status(200).json({
    status: 'success',
    data: {
      event,
    },
  });
});
