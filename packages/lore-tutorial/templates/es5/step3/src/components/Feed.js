var React = require('react');
var Tweet = require('./Tweet');

module.exports = React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      tweets: {
        data: [{
          id: 1,
          data: {
            user: 1,
            text: 'Nothing can beat science!',
            createdAt: '2016-10-04T05:10:49.382Z'
          }
        }]
      }
    }
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

});
