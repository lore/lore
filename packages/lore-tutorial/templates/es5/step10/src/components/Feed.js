var React = require('react');
var PropTypes = require('prop-types');
var Tweet = require('./Tweet');

module.exports = lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  }
})(
React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: PropTypes.object.isRequired
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
    var styles = this.getStyles();
    var tweets = this.props.tweets;

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
