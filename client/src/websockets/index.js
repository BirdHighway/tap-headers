const url = 'ws://localhost:3001';
const connection = new WebSocket(url);

connection.onopen = () => {
  console.log('WS connection open!');
};

connection.onerror = (err) => {
  console.log('WS error!');
  console.log(err);
};

module.exports = connection;
