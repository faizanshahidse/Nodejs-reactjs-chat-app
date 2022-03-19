const express = require('express');
const app = express();

const authRouter = require('./users');

app.use('/auth', authRouter);

module.exports = app;
