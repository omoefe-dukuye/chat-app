/* global io */

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', ({ from, text, createdAt }) => {
    const li = jQuery('<li></li>').html(`${from}: ${text}. <small><em>(${createdAt})</em></small>`);
    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', ({ from, url, createdAt }) => {
    const li = jQuery('<li></li>').text(`${from}: `);
    const anchorTag = jQuery('<a target=_blank></a>').text('My Current Location');
    const small = jQuery('<small></small>').html(`<em>. (${createdAt})</em>`);

    anchorTag.attr('href', url);
    li.append(anchorTag);
    li.append(small);
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User', text: jQuery('[name=message]').val()
    });
  });

  const locationButton = jQuery('#send-location');

  locationButton.on('click', () => {
    if (!navigator.geolocation) {
      alert('This is 2019 brah! No geolocation support???');
    } else {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        socket.emit('createLocationMessage', { latitude, longitude });
      }, (error) => {
        console.log(error);
        alert('Let us get your fucking Location!');
      });
    }
  });

  socket.on('disconnect', () => console.log('Disconnected from server'));
});
