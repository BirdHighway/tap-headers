import React from 'react';
import ManageConnection from './ManageConnection';
import UpdateControl from './UpdateControl';
import CompactControl from './CompactControl';
import SpecifyHeaders from './SpecifyHeaders';

const ControlPanel = (props) => {

  return (
    <div id="control-panel-div">
      <CompactControl
        setAllCompact={props.setAllCompact}
        setAutoCompact={props.setAutoCompact}
        autoCompact={props.autoCompact} />
      <SpecifyHeaders
        type="request"
        displayParams={props.reqDisplayParams}
        addDisplayParam={props.addDisplayParam}
        removeDisplayParam={props.removeDisplayParam} />
      <SpecifyHeaders
        type="response"
        displayParams={props.resDisplayParams}
        addDisplayParam={props.addDisplayParam}
        removeDisplayParam={props.removeDisplayParam} />
      <UpdateControl
        isConnected={props.isConnected}
        autoUpdate={props.autoUpdate}
        toggleAutoUpdate={props.toggleAutoUpdate}
        queueLength={props.queueLength}
        handleQueue={props.handleQueue} />
      <ManageConnection
        isConnected={props.isConnected}
        closeConnection={props.closeConnection} />
    </div>
  );
};

export default ControlPanel;
