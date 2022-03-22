const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AppError = require('../utils/app.error');
const User = require('../models/user.model');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },

  async function (req, username, password, done) {
    try {
      const foundUser = await User.findOne({
        email: username,
      });

      console.log('Found User...........................', foundUser);

      if (!foundUser)
        return done(null, false, new AppError('Invalid Email Address', 401));

      if (!(await foundUser.validatePassword(password))) {
        return done(null, false, new AppError('Invalid Password', 401));
      }

      return done(null, foundUser);
    } catch (err) {
      return done(null, false, new AppError('Invalid Login' + err, 500));
    }
  },
);

module.exports = {
  localStrategy,
};
