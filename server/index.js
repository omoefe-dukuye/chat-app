import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';

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
  socket.on('createComment', comment => {
    console.log('New Comment!', comment);
    io.emit('newComment', { ...comment, createdAt: new Date().getTime() });
  });
  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(port, () => console.log(`Server now start on port ${port}`));