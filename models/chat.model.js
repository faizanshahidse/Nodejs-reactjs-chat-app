const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
});

const Chat = mongoose.model('chat', schema);

module.exports = Chat;
