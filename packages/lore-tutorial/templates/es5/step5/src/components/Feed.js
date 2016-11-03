var React = require('react');

module.exports = React.createClass({
  displayName: 'Feed',

  propTypes: {
    tweets: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    var tweet = {
      id: 1,
      cid: 'c1',
      state: 'RESOLVED',
      data: {
        id: 1,
        user: 1,
        text: 'Nothing can beat science!',
        createdAt: '2016-10-04T05:10:49.382Z'
      }
    };

    return {
      tweets: {
        state: 'RESOLVED',
        data: [tweet]
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
      <li key={tweet.id}>
        {tweet.data.text}
      </li>
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

});
