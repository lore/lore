var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');
var InfiniteScrolling = require('../mixins/InfiniteScrolling');

module.exports = lore.connect(function(getState, props) {
  return {
    tweets: getState('tweet.find', {
      pagination: {
        sort: 'createdAt DESC',
        page: 1
      }
    })
  }
})(
React.createClass({
  displayName: 'Feed',

  mixins: [
    InfiniteScrolling
  ],

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
      <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
    );
  },

  render: function() {
    var styles = this.getStyles();
    var pages = this.state.pages;
    var numberOfPages = pages.length;
    var lastPage = pages[pages.length - 1];

    if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
      return (
        <h2 style={styles.title}>
          Loading feed...
        </h2>
      )
    }

    var tweetListItems = _.flatten(pages.map(function(tweets) {
      return tweets.data.map(this.renderTweet)
    }.bind(this)));

    return (
      <div>
        <h2 style={styles.title}>
          Feed
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {tweetListItems}
        </ul>
      </div>
    );
  }

})
);
