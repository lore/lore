var React = require('react');

module.exports = function(options){
  options = options || {};
  var propName = options.propName;
  var modelName = options.modelName;

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
      var storeState = this.context.store.getState();
      var pages = this.state.pages;

      // Whenever the component re-renders, we need to rebuild our collection of pages
      // by fetching them back out of the Store. If we don't do this, our state data
      // will always be stale - we'll never know when data finishes being fetched, and
      // in the cases where some of the data is being modified, such as being updated
      // or deleted, we won't get a change to react to those changes and inform the user.
      var nextPages = pages.map(function (page) {
        var query = JSON.stringify(page.query);
        return storeState[modelName].find[query];
      });

      var currentQuery = JSON.stringify(this.props[propName].query.where);
      var nextQuery = JSON.stringify(nextProps[propName].query.where);

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
      var storeState = this.context.store.getState();
      var pages = this.state.pages;
      var lastPage = pages[pages.length - 1];
      var nextPageNumber = Number(lastPage.query.pagination.page) + 1;
      var query = lastPage.query;

      // Build the next page's query from the previous page. The only
      // thing we're changing is the page of data we want to fetch
      var nextQuery = {
        where: query.where,
        pagination: _.defaults({
          page: nextPageNumber
        }, query.pagination)
      };

      // See if the next page has already been fetched, and used the cached page
      // if available
      var nextPage = storeState[modelName].find[JSON.stringify(nextQuery)];

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
  }
};
