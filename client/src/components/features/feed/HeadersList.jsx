import React from 'react';
import Header from './Header';

const HeadersList = ({data}) => {

  if (data === null) {
    return null;
  }

  const headerLines = Object.entries(data.headers).map((header) => {
    return (
      <Header key={header[0]} header={header} />
    );
  });

  return (
    <div className="header-lines">
      {headerLines}
    </div>
  );
};

export default HeadersList;
