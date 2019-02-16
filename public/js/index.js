const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newComment', ({ from: sender, text, createdAt }) => {
    const newPara = document.createElement('p');
    newPara.innerHTML = `${sender}: ${text}. <small>(${createdAt})</small>`;
    document.querySelector('body').appendChild(newPara);
  });

  console.log('Disconnected from server');
});

