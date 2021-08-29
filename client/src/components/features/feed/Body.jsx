import React from 'react';

const Body = ({data}) => {

  const bodyPresent = data && data.body;

  if (!bodyPresent) {
    return null;
  }

  return (
    <div className="exchange-body px-2">
      {data.body}
    </div>
  );
};

export default Body;
