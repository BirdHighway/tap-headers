import React from 'react';
import Cycle from './Cycle';

const CycleList = (props) => {
  const cycles = props.cycles.map((cycle) => {
    return (
      <Cycle key={cycle.key}
        cycle={cycle}
        reqDisplayParams={props.reqDisplayParams}
        resDisplayParams={props.resDisplayParams}
        toggleCompact={props.toggleCompact}/>
    );
  });


  return (
    <div id="cycle-list-div">
      {cycles}
    </div>
  );
};

export default CycleList;
