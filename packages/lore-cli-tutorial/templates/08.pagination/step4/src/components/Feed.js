import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tweet from './Tweet';
import { useConnect } from '@lore/connect';
import PayloadStates from '../constants/PayloadStates';
import { parse, stringify } from 'query-string';
import { Link } from 'react-router-dom';

export default function Feed(props) {
  const { location } = props;

  const _tweets = useConnect('tweet.find', {
    pagination: {
      sort: 'createdAt DESC',
      page: parse(location.search).page || '1'
    }
  });

  const [tweets, setTweets] = useState(_tweets);
  const [nextTweets, setNextTweets] = useState(_tweets);
  const [isFetching, setIsFetching] = useState(_tweets.state === PayloadStates.FETCHING);

  // check if we're fetching the next page of tweets
  const isFetchingNextTweets = nextTweets.state === PayloadStates.FETCHING;

  useEffect(() => {
    const nextTweets = _tweets;

    if (nextTweets.state === PayloadStates.FETCHING) {
      setNextTweets(nextTweets);
      setIsFetching(true);
    } else {
      setTweets(nextTweets);
      setNextTweets(nextTweets);
      setIsFetching(false);
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

  const currentPage = tweets.query.pagination.page;
  const paginationLinks = [];

  function renderPaginationLink(page, currentPage) {
    return (
      <li key={page} className={currentPage === String(page) ? 'active' : ''}>
        <Link to={{ pathname: '/', search: stringify({ page: page }) }}>
          {page}
        </Link>
      </li>
    );
  }

  // calculate the number of pagination links from our metadata, then
  // generate an array of pagination links
  const numberOfPages = Math.ceil(tweets.meta.totalCount / tweets.meta.perPage);
  for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    paginationLinks.push(renderPaginationLink(pageNumber, currentPage));
  }

  return (
    <div className="feed">
      <h2 className="title">
        Feed
      </h2>
      <ul className={`media-list tweets ${isFetchingNextTweets ? 'transition' : ''}`}>
        {tweets.data.map((tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        })}
      </ul>
      <nav>
        <ul className="pagination">
          {paginationLinks}
        </ul>
      </nav>
    </div>
  );
}
