const Department = require('../models/department');
const authController = require('./authController');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createDepartment = catchAsync(async (req, res, next) => {
  const department = new Department({
    ...req.body,
    owner: req.user._id,
  });
  await department.save();
  res.status(201).json({
    status: 'success',
    data: {
      department,
    },
  });
});

exports.allDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.find();
  res.status(200).json({
    status: 'success',
    data: {
      departments,
    },
  });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  //2. Filtered out unwanted field names not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'mission', 'vision');

  //3. Update members document
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: department,
  });
});

exports.removeDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!department) {
    return next(new AppError('There is no such department!!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: department,
  });
});
