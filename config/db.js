const config = require('./keys');
const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () => {
  mongoose.connect(config.mongoURI, connectionOptions);

  const conn = mongoose.connection;
  return conn;
};

module.exports = connection;
