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

  dataRelay.on('data', (dataObject) => {
    const stringifiedData = JSON.stringify(dataObject);
    wss.clients.forEach((ws) => {
      ws.send(stringifiedData);
    });
  });

  // set up the web socket connection
  wss.on('connection', (ws) => {
    console.log(`tap-headers WebSocket "connection" event`);
  });

  wss.on('close', () => {
    console.log(`tap-headers WebSocket "close" event`);
  });

  server.listen(PORT, () => {
    let width = process.stdout.columns || 100;
    width = width > 100 ? 100 : width;
    const fullLine = '*'.repeat(width);
    let messageLine = `tap-headers data is now visible at http://localhost:${PORT}`;
    let blankLine = '*';
    if (width > 62) {
      messageLine = '* ' + messageLine.padEnd(width - 3, ' ') + '*';
      blankLine = '* ' + ' '.repeat(width - 3) + '*';
    }
    console.log(fullLine);
    console.log(blankLine);
    console.log(messageLine);
    console.log(blankLine);
    console.log(fullLine);
  });

  const middleware = (request, response, next) => {
    counter++;
    const requestId = counter;
    const requestData = util.getRequestData(request, requestId);
    dataRelay.write(requestData);
    const _end = response.end.bind(response);
    response.end = (data) => {
      _end(data);
      const responseData = util.getResponseData(response, requestId);
      dataRelay.write(responseData);
    };
    next();
  };


  return middleware;
};

module.exports = createMiddleware;
