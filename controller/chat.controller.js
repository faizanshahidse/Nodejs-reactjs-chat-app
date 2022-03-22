const socket = require('../socket/socket');
const Chat = require('../models/chat.model');
const asyncHandler = require('express-async-handler');

class SocketIo {
  constructor(io) {
    this.io = io;
  }

  messageEmit(data) {
    this.io.emit('message', data);
  }
}

// module.exports = (io) => {
const create = asyncHandler(async (req, res) => {
  const {
    body: { userId, text },
  } = req;

  const io = req.app.get('socketio');

  console.log(userId, text);

  const newChat = await Chat.create({ userId, text });

  new SocketIo(io).messageEmit(newChat);

  return res.json({ message: 'socket success', data: newChat });
});

module.exports = {
  create,
};