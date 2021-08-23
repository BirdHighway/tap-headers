import React from 'react';

const Header = ({header}) => {
  const field = header[0];
  const value = header[1];
  return (
    <p className="header">
      <span>{field}: </span>
      <span>{value}</span>
    </p>
  );
};

export default Header;
