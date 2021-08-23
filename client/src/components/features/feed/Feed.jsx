import React from 'react';
import { useSelector } from 'react-redux';
import Exchange from './Exchange';

const selectFeed = state => state.feed;

const Feed = () => {
  const feed = useSelector(selectFeed);
  const exchanges = feed.map((exchange) => {
    return (
      <Exchange key={exchange.key} exchange={exchange} />
    );
  });


  return (
    <div>
      {exchanges}
    </div>
  );
};

export default Feed;
