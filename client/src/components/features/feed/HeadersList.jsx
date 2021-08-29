import React from 'react';
import Header from './Header';

const HeadersList = ({data, compact}) => {

  const compactClass = compact ? 'compact' : 'expanded';

  if (data === null) {
    return (
      <div className={"header-lines " + compactClass}></div>
    );
  }

  const headerLines = Object.entries(data.headers).map((header) => {
    return (
      <Header key={header[0]} header={header} />
    );
  });

  return (
    <div className={"header-lines px-2 " + compactClass}>
      {headerLines}
      <span key="empty-line" className="header">
        <span> </span>
      </span>
    </div>
  );
};

export default HeadersList;
