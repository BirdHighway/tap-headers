import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import connection from '../../../websockets';

const selectSettings = state => state.settings;

const ControlConnection = () => {

  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const closeConnection = () => {
    connection.close();
    dispatch({ type: 'settings/closeConnection' });
  };

  return (
    <div className="col">
      <div className="card h-100 border-dark">
        <div className="card-header">
          <h5 className="pt-2">Connection</h5>
        </div>
        <div className="card-body text-dark">
        <button onClick={closeConnection}
          disabled={!settings.connected}
          type="button"
          className="btn btn-danger">
          Close Connection
        </button>
        </div>
      </div>
    </div>
  );
};

export default ControlConnection;
