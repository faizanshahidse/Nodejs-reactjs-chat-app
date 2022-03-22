const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controller/user.controller');

router.get('/getAll', getAllUsers);

module.exports = router;
