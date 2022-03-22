const express = require('express');
const router = express.Router();

const { create } = require('../controller/chat.controller');

router.post('/create', create);

module.exports = router;
