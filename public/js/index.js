const socket = io();

const addToDom = ({ from: sender, text, createdAt }) => {
  const newPara = document.createElement('p');
  newPara.innerHTML = `${sender}: ${text}. <small>(${createdAt})</small>`;
  document.querySelector('body').appendChild(newPara);
};

socket.on('connect', () => {
  console.log('Connected to server');

  socket.on('newComment', comment => addToDom(comment));

  socket.on('newUser', () => addToDom({ from: 'Admin', text: 'New User Joined', createdAt: new Date().getTime() }));

  socket.on('disconnect', () => console.log('Disconnected from server'));
});

