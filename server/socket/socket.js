// const chatController = require('../controller/chat.controller');

module.exports = (io) => {
  // return new Promise((resolve, reject) => {
  io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    // return resolve(socket);
  });
  // });
};
