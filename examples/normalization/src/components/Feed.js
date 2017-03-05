var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');

module.exports = lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find', {
      pagination: {
        _expand: 'user'
      }
    }),
    // tweet: getState('tweet.byId', {
    //   id: 1
    // })
  }
})(
React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: React.PropTypes.object.isRequired
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
