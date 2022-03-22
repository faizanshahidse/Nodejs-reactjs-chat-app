const express = require('express');
const app = express();

const authRouter = require('./user.route');
const chatRouter = require('./chat.route');

app.use('/auth', authRouter);
app.use('/chat', chatRouter);

module.exports = app;
