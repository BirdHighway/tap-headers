import React from 'react';

const SingleParam = ({paramText, removeDisplayParam, type}) => {
  const clickHandler = () => {
    console.log('clickHandler')
    removeDisplayParam(type, paramText);
  };

  return (
    <p className="param">
      <span className="param-span">{paramText}</span>
      <button className="btn delete-btn btn-red"
        onClick={clickHandler}>
        X
      </button>
    </p>
  );
};

export default SingleParam;
