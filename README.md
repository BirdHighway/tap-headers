# Tap Headers

Express middleware for easily viewing request and response headers in the browser.

## About

This is intended for educational purposes, although it may also be useful in certain debugging situations. It is not recommended for production environments.

## Installation
```
npm install tap-headers
```

## Usage

```
// inside your express app
const tapHeaders = require('tap-headers');
app.use(tapHeaders());
```

Navigate to http://localhost:3001 to view the record of request and response headers. Every new request is given a new id, and the most recent requests will be updated in real time at the top of the page.

![Tap headers screenshot](./screenshot.png?raw=true "Tap Headers Screenshot")

## Tech Stack

Calling `tapHeaders()` initiates a very basic web server on port 3001 that serves the HTML, JavaScript and CSS that make up the webpage displaying the headers received and sent so far. The return value of the function is a standard Express middleware function of the type `(req, res, next) => { ... }`.

As soon as a request is received by the Express server, the middleware assigns it a request ID that it will also use for the data from the response. The request headers can be immediately sent to a stream that relays them to the simple webserver on port 3001 via WebSockets.

Response headers are captured by overwriting the `end()` method of Node's `http.ServerResponse` class. The new method sends the headers to the relay stream before invoking the original method.

The frontend website itself is built with React.

