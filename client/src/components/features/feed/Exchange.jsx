import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeadersList from './HeadersList';

const Exchange = ({exchange}) => {

  const dispatch = useDispatch();

  const toggleCompact = () => {
    dispatch({
      type: 'feed/compactOne',
      payload: {
        id: exchange.id
      }
    });
  };

  const requestHeaders = exchange.isCompact() ? '' : <HeadersList data={exchange.request} />;;
  const responseHeaders = exchange.isCompact() ? '' : <HeadersList data={exchange.response} />;
  const timeElapsed = exchange.getTimeElapsed();

  return (
    <div className="exchange-row">
      <div className="row exchange-header">
        <div className="col-3">
          <p>ID #{exchange.id}</p>
        </div>
        <div className="col-3">
          <p>{exchange.requestTime}</p>
        </div>
        <div className="col-6">
          <p>Response Time: {timeElapsed}</p>
        </div>
      </div>
      <div className="row">
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
      <div className="row exchange-controls">
        <div className="col">
          <button onClick={toggleCompact}
            type="button"
            className="btn btn-sm btn-secondary">
            Toggle Compact
          </button>

        </div>
      </div>
    </div>
  );
};

export default Exchange;
