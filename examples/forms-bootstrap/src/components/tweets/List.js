var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var PayloadStates = require('../../constants/PayloadStates');
var Tweet = require('./Tweet');

module.exports = lore.connect(function(getState, props){
  return {
    newTweets: getState('tweet.all', {
      where: function(tweet) {
        return !tweet.id || (tweet.data.createdAt - lore.timestamp) > 0
      },
      sortBy: function(tweet) {
        return -tweet.data.createdAt;
      }
    }),
    tweets: getState('tweet.find', {
      where: {
        createdAt_lte: lore.timestamp,
        _sort: 'createdAt',
        _order: 'DESC'
      }
    })
  }
})(
Router.withRouter(React.createClass({
  displayName: 'List',

  propTypes: {
    tweets: React.PropTypes.object.isRequired,
    newTweets: React.PropTypes.object.isRequired
  },

  renderTweet: function(model) {
    return (
      <Tweet key={model.id || model.cid} tweet={model} />
    );
  },

  render: function() {
    var tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <div>Loading...</div>
      );
    }

    var newTweets = this.props.newTweets.data.map(this.renderTweet);

    return (
      <div>
        <h2>
          Tweets
        </h2>
        <div className="media-list tweets list-group">
          {newTweets}
          {tweets.data.map(this.renderTweet)}
        </div>
      </div>
    );
  }

}))
);
