const url = `ws://localhost:${window.TAP_HEADERS_PORT}`;
const connection = new WebSocket(url);

connection.onopen = () => {
  console.log('WS connection open!');
};

connection.onerror = (err) => {
  console.log('WS error!');
  console.log(err);
};

module.exports = connection;
