const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

const Chat = mongoose.model('Chat', schema);

module.exports = Chat;
