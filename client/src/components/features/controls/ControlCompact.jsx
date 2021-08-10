import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const selectSettings = state => state.settings;

const ControlCompact = () => {

  const settings = useSelector(selectSettings);
  const dispatch = useDispatch();

  const toggleAutoCompact = () => {
    dispatch({ type: 'settings/toggleAutoCompact' });
  }

  return (
    <div className="col">
      <button type="button" className="btn btn-primary">Compact All</button>
      <br />
      <button type="button" className="btn btn-primary">Expand All</button>
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
