import React from 'react';
import ControlCompact from './ControlCompact';
import ControlConnection from './ControlConnection';

const Controls = () => {
  return (
    <div className="row controls-row mb-3">
      <ControlCompact />
      <ControlConnection />
    </div>
  )
};

export default Controls;
