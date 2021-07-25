const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const DataRelay = require('./data-relay.js');

const util = require('./functions.js');

// the webpage displaying the data
const htmlPath = path.join(__dirname, '..', 'client', 'dist', 'index.html');
const html = fs.readFileSync(htmlPath);

const bundlePath = path.join(__dirname, '..', 'client', 'dist', 'bundle.js');
const bundle = fs.readFileSync(bundlePath);

const stylesPath = path.join(__dirname, '..', 'client', 'dist', 'styles.css');
const styles = fs.readFileSync(stylesPath);

const createMiddleware = (options) => {
  options = options | {};
  const PORT = options.port | 3001;
  const server = http.createServer();
  const wss = new WebSocket.Server({server});

  var counter = 0;
  const dataRelay = new DataRelay();

  // serve the webpage
  server.on('request', (request, response) => {
    const url = request.url;
    let contentType;
    let data;
    if (url === '/' || url === '/index.html') {
      contentType = 'text/html; charset=UTF-8';
      data = html.toString();
    }
    if (url === '/bundle.js') {
      contentType = 'application/javascript; charset=UTF-8';
      data = bundle.toString();
    }
    if (url === '/styles.css') {
      contentType = 'text/css; charset=UTF-8';
      data = styles.toString();
    }
    response.writeHead(200, {'Content-Type': contentType});
    response.end(data);
  });

  // set up the web socket connection
  wss.on('connection', (ws) => {
    dataRelay.on('data', (dataObject) => {
      const stringifiedData = JSON.stringify(dataObject);
      ws.send(stringifiedData);
    });
  });

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  const middleware = (request, response, next) => {
    counter++;
    const requestId = counter;
    const requestData = util.getRequestData(request, requestId);
    dataRelay.write(requestData);
    const _end = response.end.bind(response);
    response.end = (data) => {
      const responseData = util.getResponseData(response, requestId);
      dataRelay.write(responseData);
      _end(data);
    };
    next();
  };


  return middleware;
};

module.exports = createMiddleware;
