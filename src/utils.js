/* eslint-disable import/prefer-default-export */

const prettyDatetime = (ISOString) => {
  const then = new Date(ISOString);
  const now = new Date();

  const timeString = then.toLocaleTimeString();

  let dateString = '';
  if (then.toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
    dateString = 'Сегодня';
  } else {
    dateString = then.toLocaleDateString();
  }

  return `${dateString} ${timeString}`;
};

export {
  prettyDatetime,
};
