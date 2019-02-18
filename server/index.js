import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';

import { generateMessage, generateLocationMessage } from './utils/generateMessage';

const publicPath = path.join(__dirname, '../public');
const app = express();
const { PORT: port = 3000 } = process.env;

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', ({ from, text }, cb) => {
    io.emit('newMessage', generateMessage(from, text));
    cb();
  });

  socket.on('createLocationMessage', (coords, cb) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    cb();
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(port, () => console.log(`Server now start on port ${port}`));
