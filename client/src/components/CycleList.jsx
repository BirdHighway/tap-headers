import React from 'react';
import Cycle from './Cycle';

const CycleList = (props) => {

  const cycles = props.cycles.map((cycle) => {
    return (
      <Cycle key={cycle.id} cycle={cycle} />
    );
  });


  return (
    <div className="cycle-list-div">
      {cycles}
    </div>
  );
};

export default CycleList;
