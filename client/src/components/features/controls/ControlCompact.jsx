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
      <div className="card h-100 border-dark">
        <div className="card-header">
          <h5 className="pt-2">Compact</h5>
        </div>
        <div className="card-body text-dark">
          <button onClick={compactAll}
            type="button"
            className="btn btn-secondary">
            Compact All
          </button>
          <br />
          <button onClick={expandAll}
            type="button"
            className="btn btn-secondary">
            Expand All
          </button>
          <br />
          <div className="form-check">
            <input name="autoCompact"
              className="form-check-input"
              id="checkAutoCompact"
              type="checkbox"
              checked={settings.autoCompact}
              onChange={toggleAutoCompact}
            />
            <label className="form-check-label"
              htmlFor="checkAutoCompact">
              Auto Compact New
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCompact;
