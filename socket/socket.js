// const chatController = require('../controller/chat.controller');

module.exports = (io) => {
  return new Promise((resolve, reject) => {
    io.on('connection', (socket) => {
      console.log('new connection');

      // socket.on('join_room', ({ room }) => {
      //   console.log('::::join:::::>>>>>>>>>>>>>>>', room);
      //   socket.join(room);
      // });

      // socket.on('join_notification_room', ({ room }) => {
      //   console.log('::::joinvv:::::>>>>>>>>>>>>>>>', room);
      //   socket.join(room);
      // });

      // socket.on('join_comment_room', ({ room }) => {
      //   console.log('::::join_comment_room:::::>>>>>>>>>>>>>>>', room);
      //   socket.join(room);
      // });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      return resolve(socket);
    });
  });
};
