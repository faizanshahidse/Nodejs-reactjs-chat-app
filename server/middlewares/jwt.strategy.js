const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const AppError = require('../utils/app.error');
const User = require('../models/user.model');

console.log(process.env.JWT_Secret);
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_Secret, //key for token
};

const jWTStrategy = new JWTStrategy(opts, async (jwt_payload, done) => {
  try {
    let foundUser = await User.findById(
      {
        _id: jwt_payload.id,
      },
      { plain: true, raw: true },
    );

    console.log('foundUser............', foundUser);

    if (foundUser) done(null, foundUser);
    else done(null, false, new AppError('Invalid Login', 500));
  } catch (err) {
    // console.log({ err });
    done(null, false, new AppError('Invalid Login' + err, 500));
  }
});

module.exports = {
  jWTStrategy,
};
