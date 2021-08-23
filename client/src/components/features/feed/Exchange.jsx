import React from 'react';
import { useSelector } from 'react-redux';
import HeadersList from './HeadersList';

const Exchange = ({exchange}) => {

  return (
    <div className="row exchange-row">
      <div className="col-6">
        <div className="request-div">
          <pre className="start-line">{exchange.getRequestLine()}</pre>
          <HeadersList data={exchange.request} />
        </div>
      </div>
      <div className="col-6">
        <div className="response-div">
          <pre className="start-line">{exchange.getStatusLine()}</pre>
          <HeadersList data={exchange.response} />
        </div>
      </div>
    </div>
  );
};

export default Exchange;
