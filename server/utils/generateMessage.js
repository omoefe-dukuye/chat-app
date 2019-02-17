export const generateMessage = (from, text) => ({ from, text, createdAt: new Date().getTime() });

export const generateLocationMessage = (from, { latitude, longitude }) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().getTime()
});
