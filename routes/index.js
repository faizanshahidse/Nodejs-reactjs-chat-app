const express = require('express');
const app = express();

const authRouter = require('./auth.route');
const chatRouter = require('./chat.route');
const userRouter = require('./user.route');

app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.use('/user', userRouter);

module.exports = app;
