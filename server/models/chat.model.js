const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', schema);

module.exports = Chat;
