const asyncHandler = require('express-async-handler');
const messages = require('../config/messages');
const User = require('../models/user.model');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(201).json({ message: messages.default.success, data: users });
});

module.exports = {
  getAllUsers,
};
