/* eslint no-undef: "off" */

import React from 'react';
import _ from 'lodash';

export default function(options = {}) {
  const propName = options.propName;
  const modelName = options.modelName;

  if (!propName) {
    throw new Error('propName is required');
  }

  if (!modelName) {
    throw new Error('modelName is required');
  }

  return {
    contextTypes: {
      store: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
      return {
        pages: [
          this.props[propName]
        ]
      };
    },

    componentWillReceiveProps: function (nextProps) {
      const storeState = this.context.store.getState();
      const pages = this.state.pages;

      // Whenever the component re-renders, we need to rebuild our collection of pages
      // by fetching them back out of the Store. If we don't do this, our state data
      // will always be stale - we'll never know when data finishes being fetched, and
      // in the cases where some of the data is being modified, such as being updated
      // or deleted, we won't get a change to react to those changes and inform the user.
      let nextPages = pages.map(function (page) {
        const query = JSON.stringify(page.query);
        return storeState[modelName].find[query];
      });

      const currentQuery = JSON.stringify(this.props[propName].query.where);
      const nextQuery = JSON.stringify(nextProps[propName].query.where);

      if (currentQuery !== nextQuery) {
        nextPages = [
          nextProps[propName]
        ];
      }

      this.setState({
        pages: nextPages
      });
    },

    onLoadMore: function () {
      const storeState = this.context.store.getState();
      const pages = this.state.pages;
      const lastPage = pages[pages.length - 1];
      const nextPageNumber = Number(lastPage.query.pagination.page) + 1;
      const query = lastPage.query;

      // Build the next page's query from the previous page. The only
      // thing we're changing is the page of data we want to fetch
      const nextQuery = {
        where: query.where,
        pagination: _.defaults({
          page: nextPageNumber
        }, query.pagination)
      };

      // See if the next page has already been fetched, and used the cached page
      // if available
      let nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

      if (!nextPage) {
        // The 'find' action has a slightly different interface than the 'getState' call
        // in 'lore.connect'. When calling the 'find' action directly, you need to pass
        // in the 'where' clause and the 'pagination' information as different arguments,
        // like 'lore.actions.tweet.find(where, pagination)'
        nextPage = lore.actions[modelName].find(nextQuery.where, nextQuery.pagination).payload;
      }

      pages.push(nextPage);

      this.setState({
        pages: pages
      });
    }
  };
}
