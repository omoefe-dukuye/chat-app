const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', ({ from, text, createdAt }) => {
    const li = jQuery('<li></li>').html(`${from}: ${text}. <small>(${createdAt})</small>`);
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User', text: jQuery('[name=message]').val()
    });
  });

  socket.on('disconnect', () => console.log('Disconnected from server'));
});
