const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An user must have a name'],
    // maxLength: [40, 'An user must have less or equal than 40 characters'],
    // minLength: [10, 'An user must have more or equal than 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    // maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    // minlength: [10, 'A tour name must have more or equal then 10 characters'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    maxlength: [40, 'A password must have less or equal then 40 characters'],
    minlength: [8, 'A password must have more or equal then 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
