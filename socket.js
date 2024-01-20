const io = require('socket.io');

module.exports = (server) => {
  const socketIo = io(server);

  socketIo.on('connection', (socket) => {
    console.log('WebSocket connection established');

    socket.on('join-chat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('send-message', async ({ chatId, message }) => {
      try {
        // Save the message in the database
        await chatController.sendMessage(chatId, message);

        // Broadcast the message to all connected clients in the chat room
        socket.to(chatId).emit('new-message', message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });
  });
};
