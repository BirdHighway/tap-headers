import React from 'react';

const formatFirstLine = (request) => {
  const method = request.meta.method;
  const url = request.meta.url;
  const version = request.meta.version;
  return `${method} ${url} HTTP/${version}`;
}

const formatHeaders = (headers) => {
  let output = '';
  for (const [key, value] of Object.entries(headers)) {
    output += `${key}: ${value}\n`;
  }
  return output;
};

const Cycle = (props) => {
  const request = props.cycle.request;
  const response = props.cycle.response;

  const firstLine = formatFirstLine(request);

  const requestHeaders = formatHeaders(request.headers);
  const responseHeaders = response ? formatHeaders(request.headers) : '';

  return (
    <div className="cycle-container">
      <h4 className="cycle-header">{request.id}</h4>
      <div className="cycle-div">
        <div className="request-div">
          <h4>Request</h4>
          <pre className="meta-line">{firstLine}</pre>
          <div className="headers-div">
            <pre>{requestHeaders}</pre>
          </div>
        </div>
        <div className="response-div">
          <h4>Response</h4>
          {response &&
            <pre className="meta-line">{response.meta.statusCode}</pre>
          }
          <div className="headers-div">
            <pre>{responseHeaders}</pre>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Cycle;
