import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';

import { generateMessage, generateLocationMessage } from './utils/generateMessage';
import isRealString from './utils/validator';
import Users from './utils/users';


const users = new Users();
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

  socket.on('createMessage', ({ from, text }, cb) => {
    io.emit('newMessage', generateMessage(from, text));
    cb();
  });

  socket.on('createLocationMessage', (coords, cb) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    cb();
  });

  socket.on('join', ({ name, room }, cb) => {
    if (!isRealString(name, room)) {
      return cb('Name and room name are required');
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);

    console.log(users.getUserList(room));

    io.to(room).emit('updateUsersList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} just joined the room`));

    cb();
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    console.log(user, 'removed');
    if (user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} just left`));
    }
  });
});

server.listen(port, () => console.log(`Server now start on port ${port}`));
