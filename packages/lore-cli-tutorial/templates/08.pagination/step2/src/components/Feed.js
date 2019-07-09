import React from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';
import { useConnect } from '@lore/connect';
import PayloadStates from '../constants/PayloadStates';
import { parse } from 'query-string';

export default function Feed(props) {
  const { location } = props;

  const tweets = useConnect('tweet.find', {
    pagination: {
      sort: 'createdAt DESC',
      page: parse(location.search).page || '1'
    }
  });

  if (tweets.state === PayloadStates.FETCHING) {
    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <div className="loader"/>
      </div>
    );
  }

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
