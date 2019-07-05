import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import PayloadStates from '../constants/PayloadStates';
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
              page: 1,
              populate: 'user'
            },
            exclude: function(tweet) {
              return tweet.state === PayloadStates.DELETED;
            }
          });
        }}
        row={(tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        }}
        refresh={(page, getState) => {
          return getState('tweet.find', _.defaultsDeep({
            exclude: function(tweet) {
              return tweet.state === PayloadStates.DELETED;
            }
          }, page.query));
        }}
        selectNextPage={(lastPage, getState) => {
          const lastPageNumber = lastPage.query.pagination.page;

          return getState('tweet.find', _.defaultsDeep({
            pagination: {
              page: lastPageNumber + 1
            },
            exclude: function(tweet) {
              return tweet.state === PayloadStates.DELETED;
            }
          }, lastPage.query));
        }}
        selectOther={(getState) => {
          return getState('tweet.all', {
            where: function(tweet) {
              const isOptimistic = !tweet.id;
              const isNew = moment(tweet.data.createdAt).diff(timestamp) > 0;
              return isOptimistic || isNew;
            },
            sortBy: function(model) {
              return -moment(model.data.createdAt).unix();
            },
            exclude: function(tweet) {
              return tweet.state === PayloadStates.DELETED;
            }
          });
        }}
      />
    </div>
  );
}
