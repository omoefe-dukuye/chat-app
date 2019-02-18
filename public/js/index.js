/* global io, moment */

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', ({ from, text, createdAt }) => {
    const li = jQuery('<li></li>').html(`${from}: ${text}. <small><em>(${moment(createdAt).format('h:mm a')})</em></small>`);
    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', ({ from, url, createdAt }) => {
    const li = jQuery('<li></li>').text(`${from}: `);
    const anchorTag = jQuery('<a target=_blank></a>').text('My Current Location');
    const small = jQuery('<small></small>').html(`<em>. (${moment(createdAt).format('h:mm a')})</em>`);

    anchorTag.attr('href', url);
    li.append(anchorTag);
    li.append(small);
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    const messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from: 'User', text: messageTextbox.val()
    }, () => messageTextbox.val(''));
  });

  const locationButton = jQuery('#send-location');

  locationButton.on('click', () => {
    if (!navigator.geolocation) {
      return alert('This is 2019 brah! No geolocation support???');
    }


    locationButton.text('Sending Location...').attr('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      socket.emit('createLocationMessage', { latitude, longitude }, () => {
        locationButton.removeAttr('disabled').text('Send Location');
      });
    }, (error) => {
      console.log(error);
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Let us get your fucking Location!');
    });
  });

  socket.on('disconnect', () => console.log('Disconnected from server'));
});
