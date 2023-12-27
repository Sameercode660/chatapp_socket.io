const express = require('express');
const path = require('path'); // Add the 'path' module
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Serve the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Use path.join for file paths
});

io.on('connection', (socket) => {
  console.log('New user is connected', socket.id);
  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg)
})
});

server.listen(process.env.PORT || 8080, () => {
  console.log('Server is listening on port 8080');
  console.log(io);
});
