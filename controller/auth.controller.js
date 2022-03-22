const asyncHandler = require('express-async-handler');
const passport = require('passport');
const AppError = require('../utils/app.error');
const messages = require('../config/messages');
const User = require('../models/user.model');
const Joi = require('joi');

const login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err || !user) {
      return next(new AppError(info, 500));
    }

    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);

      const token = await user.generateJWT();

      res.status(201).json({ message: messages.default.success, token });
    });
  })(req, res, next);
});

const signup = asyncHandler(async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { name, email, password } = req.body;

  await schema.validateAsync({ name, email, password });

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) return next(new AppError('User Already Exists', 500));

  const userData = {
    name,
    email,
    password,
  };

  const newUser = await User.create(userData);

  res.status(201).json({ message: messages.default.success, data: newUser });
});

module.exports = {
  login,
  signup,
};
