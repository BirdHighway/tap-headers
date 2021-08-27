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

  const getStatusBadge = (response) => {
    if (!response) {
      return `<span className="badge float-end mt-2 bg-dark">...</span>`;
    }
    let code = response.meta.statusCode;
    let c = code.toString().substring(0, 1);
    console.log(c);
    switch (c) {
      case '1':
        return <span className="badge float-end mt-2 bg-info text-dark">{code}</span>;
      case '2':
        return (<span className="badge float-end mt-2 bg-success">{code}</span>);
      case '3':
        return <span className="badge float-end mt-2 bg-primary">{code}</span>;
      case '4':
        return <span className="badge float-end mt-2 bg-warning text-dark">{code}</span>;
      case '5':
        return <span className="badge float-end mt-2 bg-danger">{code}</span>;
      default:
        return <span className="badge float-end mt-2 bg-dark">...</span>;
    };
  };

  return (
    <div className="exchange-row bg-light">
      <div className="row exchange-header">
        <div className="col-3">
          <p>ID #{exchange.id}</p>
        </div>
        <div className="col-3">
          <p className="text-end">{exchange.requestTime}</p>
        </div>
        <div className="col-3">
          <p>Response Time: {timeElapsed}</p>
        </div>
        <div className="col-3">
          {getStatusBadge(exchange.response)}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <div className="request-div border border-dark bg-white">
            <pre className="start-line px-2 pt-1">{exchange.getRequestLine()}</pre>
            <HeadersList data={exchange.request} compact={exchange.isCompact()}/>
          </div>
        </div>
        <div className="col-6">
          <div className="response-div border border-dark bg-white">
            <pre className="start-line px-2 pt-1">{exchange.getStatusLine()}</pre>
            <HeadersList data={exchange.response} compact={exchange.compact}/>
          </div>
        </div>
      </div>
      <div className="row exchange-controls">
        <div className="col">
          <button onClick={toggleCompact}
            type="button"
            className="btn btn-sm btn-outline-dark">
            Toggle Compact
          </button>

        </div>
      </div>
    </div>
  );
};

export default Exchange;
