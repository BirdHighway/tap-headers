import React from 'react';

const Header = ({header}) => {
  const field = header[0];
  const value = header[1];
  return (
    <span className="header">
      <span>{field}: </span>
      <span>{value}</span>
    </span>
  );
};

export default Header;
