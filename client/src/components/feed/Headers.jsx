import React from 'react';
import HeaderLine from './HeaderLine';

const Headers = (props) => {
  if (!props.headerObject || props.compact) {
    return null;
  }
  const displayParams = props.displayParams.map((param) => param.toLowerCase());
  const headerObject = props.headerObject;
  let headerLines = Object.entries(headerObject);
  const requestHeadersSpecified = displayParams.length > 0;
  const showAllHeaders = props.showAllHeaders;
  if (requestHeadersSpecified && !showAllHeaders) {
    headerLines = headerLines.filter((line) => {
      const headerName = line[0];
      return displayParams.includes(headerName.toLowerCase());
    });
  }
  const headerText = headerLines.map((line) => {
    return (
      <HeaderLine key={line[0]} headerLine={line}/>
    );
  });

  const toggleAllHeaders = () => {
    props.toggleShowAllHeaders(props.type);
  }

  const toggleBtnText = props.showAllHeaders ? 'Show Only Specified Headers' : 'Show All Headers';
  const toggleBtnClass = requestHeadersSpecified ? '' : 'hidden';
  const marginClass = requestHeadersSpecified ? 'extra-bottom-margin' : '';

  return (
    <div className={'headers-div ' + marginClass}>
      {headerText}
      <button className={'btn-plain btn-toggle-headers ' + toggleBtnClass}
        onClick={toggleAllHeaders}>
        {toggleBtnText}
      </button>
    </div>
  );
};

export default Headers;
