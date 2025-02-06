const User = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    message: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password updates.', 400));

  const filteredBody = filterObj(req.body, 'name', 'email');

  // if (
  //   Object.keys(filteredBody).forEach((el) => {
  //     if (el !== 'name' || el !== 'email')
  //       return next(
  //         new AppError(
  //           'Only name and email can be updated on this endpoint',
  //           400,
  //         ),
  //       );
  //   })
  // );

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.getUser = (req, res) => {};

exports.createUser = (req, res) => {};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};
