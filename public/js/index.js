/* global io, moment, Mustache */

const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newMessage', ({ from, text, createdAt }) => {
    createdAt = moment(createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, { from, text, createdAt });
    jQuery('#messages').append(html);
  });

  socket.on('newLocationMessage', ({ from, url, createdAt }) => {
    createdAt = moment(createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, { from, url, createdAt });
    jQuery('#messages').append(html);
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
