const express = require('express');
const router = express.Router();

const { create, getList } = require('../controller/chat.controller');

router.post('/create', create);
router.get('/getList/:id', getList);

module.exports = router;
