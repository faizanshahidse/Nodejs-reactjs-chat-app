const express = require('express');
const passport = require('passport');

const router = express.Router();

const { getAllUsers } = require('../controller/user.controller');

router.get(
  '/getAll',
  passport.authenticate('jwt', { session: false }),
  getAllUsers,
);

module.exports = router;
