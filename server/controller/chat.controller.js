const socket = require('../socket/socket');
const Chat = require('../models/chat.model');
const asyncHandler = require('express-async-handler');
const messages = require('../config/messages');

class SocketIo {
  constructor(io, receiver, sender) {
    this.io = io;
    this.receiver = receiver;
  }

  messageEmit(data) {
    this.io.emit(this.receiver, data);
  }
}

const create = asyncHandler(async (req, res) => {
  const {
    body: { receiver, text },
    user,
  } = req;

  const io = req.app.get('socketio');

  console.log('user..............', user.id);

  const newChat = await Chat.create({ receiver, text, sender: user.id });
  const chat = await Chat.findOne({ _id: newChat._id })
    .populate('sender')
    .populate('receiver');

  new SocketIo(io, receiver).messageEmit(chat);

  return res.json({ message: messages.default.success, data: chat });
});

const getList = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user,
  } = req;

  console.log('user.......................', user.id);

  const list = await Chat.find({ receiver: id, sender: user.id })
    .populate('sender')
    .populate('receiver');

  return res.json({ message: messages.default.success, data: list });
});

module.exports = {
  create,
  getList,
};
