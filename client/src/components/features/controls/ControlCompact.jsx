import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const selectSettings = state => state.settings;

const ControlCompact = () => {

  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const toggleAutoCompact = () => {
    dispatch({ type: 'settings/toggleAutoCompact' });
  }

  const compactAll = () => {
    dispatch({ type: 'feed/compactAll' });
  }

  const expandAll = () => {
    dispatch({ type: 'feed/expandAll' });
  }

  return (
    <div className="col">
      <button onClick={compactAll}
        type="button"
        className="btn btn-primary">
        Compact All
      </button>
      <br />
      <button onClick={expandAll}
        type="button"
        className="btn btn-primary">
        Expand All
      </button>
      <br />
      <label>
        Auto Compact New:
        <input name="autoCompact"
          type="checkbox"
          checked={settings.autoCompact}
          onChange={toggleAutoCompact}
        />
      </label>
      <pre>{JSON.stringify(settings)}</pre>
    </div>
  );
};

export default ControlCompact;
