var React = require('react');
var Tweet = require('./Tweet');
var PayloadStates = require('../constants/PayloadStates');
var LoadMoreButton = require('./LoadMoreButton');
var InfiniteScrolling = require('../mixins/InfiniteScrolling');
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
          }
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
        <LoadMoreButton lastPage={lastPage} onLoadMore={this.onLoadMore} />
      </div>
    );
  }

})
);
