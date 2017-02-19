var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');

module.exports = lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  }
})(
React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    // if the component was provided a query from lore.connect you
    // could start polling that same querying using this syntax:
    //
    // var tweets = this.props.tweets;
    // var query = tweets.query;
    // this.poll = lore.polling.tweet.find(query.where, query.pagination);
    // this.poll.start();

    // in this example, we have no query, so just invoke the action without arguments
    this.poll = lore.polling.tweet.find();
    this.poll.start();
  },

  componentWillUnmount: function() {
    this.poll.stop();
  },

  renderTweet: function(tweet) {
    return (
      <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
    );
  },

  render: function() {
    var tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <h1 className="loading-text">
          Loading...
        </h1>
      )
    }

    return (
      <div className="feed">
        <h2 className="title">
          Feed
        </h2>
        <ul className="media-list tweets">
          {tweets.data.map(this.renderTweet)}
        </ul>
      </div>
    );
  }
})
);
