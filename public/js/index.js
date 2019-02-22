/* global io, moment, Mustache */

const socket = io();

const scrollToButtom = () => {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');

  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('Connected to server');
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
  });

  socket.on('updateUsersList', (userslist) => {
    const ol = jQuery('<ol></ol>');

    userslist.forEach(user => ol.append(jQuery('<li></li>').text(user)));
    jQuery('#users').html(ol);
  });

  socket.on('newMessage', ({
    from, text, url, createdAt
  }) => {
    createdAt = moment(createdAt).format('h:mm a');
    const template = jQuery(`#${text ? '' : 'location-'}message-template`).html();
    const html = text ? Mustache.render(template, { from, text, createdAt })
      : Mustache.render(template, { from, url, createdAt });
    jQuery('#messages').append(html);
    scrollToButtom();
  });

  jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    const messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', messageTextbox.val(), (error) => {
      if (error) {
        return alert(error);
      }
      messageTextbox.val('');
    });
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
