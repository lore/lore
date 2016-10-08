var React = require('react');

module.exports = function(filter) {
  return {

    contextTypes: {
      store: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
      var newTweets = this.getNewTweets();
      return {
        newTweets: newTweets
      };
    },

    getNewTweets: function () {
      var storeState = this.context.store.getState();
      var that = this;

      return Object.keys(storeState.tweet.byCid).filter(function (cid) {
        var tweet = storeState.tweet.byCid[cid];
        return filter.call(that, tweet);
      }).map(function (cid) {
        return storeState.tweet.byCid[cid];
      });
    },

    componentWillReceiveProps: function (nextProps) {
      // Get any new tweets out of the store
      var newTweets = this.getNewTweets();

      this.setState({
        newTweets: newTweets
      });
    }

  }
};
