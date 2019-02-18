import moment from 'moment';

export const generateMessage = (from, text) => ({ from, text, createdAt: moment().valueOf() });

export const generateLocationMessage = (from, { latitude, longitude }) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: moment().valueOf()
});
