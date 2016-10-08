var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');

module.exports = lore.connect(function(getState, props) {
  return {
    tweets: getState('tweet.find')
  }
})(
React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: React.PropTypes.object.isRequired
  },

  getStyles: function() {
    return {
      title: {
        textAlign: 'center'
      },
      tweets: {
        marginTop: '32px'
      }
    }
  },

  renderTweet: function(tweet) {
    return (
      <Tweet key={tweet.id} tweet={tweet} />
    );
  },

  render: function() {
    var tweets = this.props.tweets;
    var styles = this.getStyles();

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <h2 style={styles.title}>
          Loading feed...
        </h2>
      )
    }

    return (
      <div>
        <h2 style={styles.title}>
          Feed
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {tweets.data.map(this.renderTweet)}
        </ul>
      </div>
    );
  }

})
);
