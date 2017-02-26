var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');

module.exports = lore.connect(function(getState, props){
  return {
    tweet: getState('tweet.byId', {
      id: props.params.tweetId,
      query: {
        _expand: 'user'
      }
    })
  }
})(
React.createClass({
  displayName: 'SingleTweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  render: function() {
    var tweet = this.props.tweet;

    if (tweet.state === PayloadStates.FETCHING) {
      return (
        <h1 className="loading-text">
          Loading...
        </h1>
      )
    }

    return (
      <div className="feed">
        <h2 className="title">
          Tweet
        </h2>
        <ul className="media-list tweets">
          <Tweet
            key={tweet.id || tweet.cid}
            tweet={tweet} />
        </ul>
      </div>
    );
  }
})
);
