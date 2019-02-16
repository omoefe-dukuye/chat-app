const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('newComment', comment => console.log('New Comment!', comment));
  socket.emit('createComment', {
    from: 'stacyxehi@example.com',
    to: 'omoefe.dukuye@gmail.com',
    text: 'I love you'
  });
  socket.on('disconnect', () => console.log('Disconnected from server'));
});

