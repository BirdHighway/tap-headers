# Tap Headers

Express middleware for easily viewing request and response headers in the browser.

## About

This is intended for educational purposes, although it may also be useful in certain debugging situations. It is not recommended for production environments.

## Usage

```
// inside your express app
const tapHeaders = require('/path/to/tap-headers');
app.use(tapHeaders());
```

A webpage with a log of the request and response headers will now be available at localhost:3001.
