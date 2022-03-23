const express = require('express');
const passport = require('passport');

const router = express.Router();

const { create, getList } = require('../controller/chat.controller');

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  create,
);
router.get(
  '/getList/:id',
  passport.authenticate('jwt', { session: false }),
  getList,
);

module.exports = router;
