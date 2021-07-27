import React from 'react';

const CompactControl = ({setAllCompact, setAutoCompact, autoCompact}) => {

  const compactAll = () => {
    setAllCompact(true);
  };

  const expandAll = () => {
    setAllCompact(false);
  };

  const handleCheck = (e) => {
    const checked = e.target.checked;
    setAutoCompact(checked);
  };

  return (
    <div className="control-column">
    <h4>Expand/Compact</h4>
    <div className="contents">
      <button className="btn btn-plain full-width" onClick={compactAll}>
        Compact All
      </button>
      <button className="btn btn-plain full-width" onClick={expandAll}>
        Expand All
      </button>
      <label>
        Auto Compact New:
        <input name="autoCompact"
          type="checkbox"
          checked={autoCompact}
          onChange={handleCheck} />
      </label>
    </div>
  </div>
  );
};

export default CompactControl
