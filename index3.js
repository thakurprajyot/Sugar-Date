const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', chatRoutes);

io.on('connection', (socket) => {
  // Handle WebSocket events here
});

http.listen(3001, () => {
  console.log('Server listening on port 3001');
});
