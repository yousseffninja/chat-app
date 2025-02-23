const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

io.on('connection', (socket) => {
    console.log('new ws connection...');

    socket.emit('chatMessage', 'Welcome to chat app');

    socket.broadcast.emit('chatMessage', 'A user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('chatMessage', 'A user has left the chat');
    })

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg)
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));