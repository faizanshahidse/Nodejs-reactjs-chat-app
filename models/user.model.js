const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

schema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

schema.methods.validatePassword = async function (password) {
  if (!this.password) return false;

  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

schema.methods.generateJWT = async function (id) {
  return jwt.sign({ email: this.email, id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model('user', schema);

module.exports = User;
