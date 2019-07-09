import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InfiniteScrollingList from './InfiniteScrollingList';
import Tweet from './Tweet';

export default function Feed(props) {
  const [timestamp] = useState(new Date().toISOString());

  return (
    <div className="feed">
      <h2 className="title">
        Feed
      </h2>
      <InfiniteScrollingList
        select={(getState) => {
          return getState('tweet.find', {
            where: {
              where: {
                createdAt: {
                  '<=': timestamp
                }
              }
            },
            pagination: {
              sort: 'createdAt DESC',
              page: 1
            }
          });
        }}
        row={(tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        }}
        refresh={(page, getState) => {
          return getState('tweet.find', page.query);
        }}
        selectNextPage={(lastPage, getState) => {
          const lastPageNumber = lastPage.query.pagination.page;

          return getState('tweet.find', _.defaultsDeep({
            pagination: {
              page: lastPageNumber + 1
            }
          }, lastPage.query));
        }}
      />
    </div>
  );
}
