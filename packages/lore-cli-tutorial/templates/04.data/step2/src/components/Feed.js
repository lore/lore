import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';

Feed.propTypes = {
  tweets: PropTypes.object.isRequired
};

Feed.defaultProps = (function() {
  const tweet = {
    id: 1,
    cid: 'c1',
    state: 'RESOLVED',
    data: {
      id: 1,
      userId: 1,
      text: 'Nothing can beat science!',
      createdAt: '2018-04-24T05:10:49.382Z'
    }
  };

  return {
    tweets: {
      state: 'RESOLVED',
      data: [tweet]
    }
  };
})();

export default function Feed(props) {
  const { tweets } = props;

  return (
    <div className="feed">
      <h2 className="title">
        Feed
      </h2>
      <ul className="media-list tweets">
        {tweets.data.map((tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        })}
      </ul>
    </div>
  );
}
