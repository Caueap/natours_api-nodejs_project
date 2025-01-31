const User = require('../models/user-model');
const catchAsync = require('../utils/catch-async');

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

exports.getUser = (req, res) => {};

exports.createUser = (req, res) => {};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};
