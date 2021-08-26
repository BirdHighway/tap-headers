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
      <h3>Connection</h3>
      <button onClick={closeConnection}
        type="button"
        className="btn btn-danger">
        Close Connection
      </button>
    </div>
  );
};

export default ControlConnection;
