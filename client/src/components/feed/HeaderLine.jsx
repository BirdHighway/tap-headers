import React from 'react';

const HeaderLine = ({headerLine}) => {
  const field = headerLine[0];
  const value = headerLine[1];

  return (
    <p className="header-line">
      <span className="header-field">{field}</span>: <span className="header-value">{value}</span>
    </p>
  );
};

export default HeaderLine;
