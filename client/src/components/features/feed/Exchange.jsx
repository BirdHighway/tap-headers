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
            <HeadersList data={exchange.request} compact={exchange.isCompact()}/>
          </div>
        </div>
        <div className="col-6">
          <div className="response-div">
            <pre className="start-line">{exchange.getStatusLine()}</pre>
            <HeadersList data={exchange.response} compact={exchange.compact}/>
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
