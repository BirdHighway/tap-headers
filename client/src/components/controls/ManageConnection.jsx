import React from 'react';

const ManageConnection = ({closeConnection, isConnected}) => {
  return (
    <div className="control-column">
      <h4>Manage</h4>
      <div className="contents">
        <button className="btn btn-plain full-width"
          disabled={!isConnected}
          onClick={closeConnection}>
          Close Connection
        </button>
        <p className={isConnected ? "hidden" : undefined}>
          Connection Closed
        </p>
      </div>
    </div>
  );
};

export default ManageConnection;
