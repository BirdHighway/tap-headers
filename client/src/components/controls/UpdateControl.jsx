import React from 'react';

const UpdateControl = ({autoUpdate, toggleAutoUpdate, queueLength, handleQueue, isConnected}) => {

  const queueEmpty = queueLength === 0;

  const mergeAll = () => { handleQueue('merge') };
  const deleteAll = () => { handleQueue('delete') };
  const mergeOne = () => { handleQueue('next') };

  return (
    <div className="control-column">
      <h4>New Messages</h4>
      <div className="contents">
        <div className={autoUpdate ? undefined : 'hidden'}>
          <button className="btn btn-plain full-width"
            disabled={!isConnected}
            onClick={toggleAutoUpdate}>
            Pause Updates
          </button>
        </div>
        <p className={autoUpdate ? 'hidden' : undefined}>
          Queued Messages: {queueLength}
        </p>
        <div className={autoUpdate ? 'hidden' : undefined}>
          <button className="btn btn-plain full-width"
            disabled={!queueEmpty}
            onClick={toggleAutoUpdate}>
            Resume Updates
          </button>
          <button className="btn btn-plain full-width"
            onClick={mergeAll}>
              Merge All Queued
          </button>
          <button className="btn btn-plain full-width"
            onClick={deleteAll}>
              Delete All Queued
          </button>
          <button className="btn btn-plain full-width no-margin-bottom"
            onClick={mergeOne}>
              Merge One
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateControl;
