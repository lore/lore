var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');
var LoadMoreButton = require('./LoadMoreButton');
var InfiniteScrolling = require('../mixins/InfiniteScrolling');
var NewTweets = require('../mixins/NewTweets');
var moment = require('moment');

// Get the date the app was loaded, so we can avoid pagination conflicts
var timestamp = moment().format();

module.exports = lore.connect(function(getState, props) {
  return {
    tweets: getState('tweet.find', {
      where: {
        where: {
          createdAt: {
            '<=': timestamp
          },
          user: props.params.userId
        }
      },
      pagination: {
        sort: 'createdAt DESC',
        page: 1
      }
    })
  }
})(
React.createClass({
  displayName: 'UserTweets',

  mixins: [
    InfiniteScrolling,
    NewTweets(function(tweet) {
      var userId = Number(this.props.params.userId);
      var createdAt = moment(tweet.data.createdAt);
      return createdAt.diff(timestamp) > 0 && tweet.data.user === userId;
    })
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
    var newTweets = this.state.newTweets;

    if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
      return (
        <h2 style={styles.title}>
          Loading your tweets...
        </h2>
      )
    }

    var tweetListItems = _.flatten(pages.map(function(tweets) {
      return tweets.data.map(this.renderTweet)
    }.bind(this)));

    var newTweetListItems = _.sortBy(newTweets, function(tweet) {
      return -moment(tweet.data.createdAt).unix();
    }).map(this.renderTweet);

    return (
      <div>
        <h2 style={styles.title}>
          My Tweets
        </h2>
        <ul className="media-list" style={styles.tweets}>
          {newTweetListItems}
          {tweetListItems}
        </ul>
        <LoadMoreButton lastPage={lastPage} onLoadMore={this.onLoadMore} />
      </div>
    );
  }

})
);
