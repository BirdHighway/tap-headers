import React from 'react';
import { useSelector } from 'react-redux';
import HeadersList from './HeadersList';

const Exchange = ({exchange}) => {

  const requestHeaders = exchange.isCompact() ? '' : <HeadersList data={exchange.request} />;;
  const responseHeaders = exchange.isCompact() ? '' : <HeadersList data={exchange.response} />;

  return (
    <div className="row exchange-row">
      <div className="col-6">
        <div className="request-div">
          <pre className="start-line">{exchange.getRequestLine()}</pre>
          {requestHeaders}
        </div>
      </div>
      <div className="col-6">
        <div className="response-div">
          <pre className="start-line">{exchange.getStatusLine()}</pre>
          {responseHeaders}
        </div>
      </div>
    </div>
  );
};

export default Exchange;
