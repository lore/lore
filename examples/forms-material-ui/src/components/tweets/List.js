var React = require('react');
var Router = require('react-router');
var mui = require('material-ui');
var _ = require('lodash');
var Spinner = require('../common/Spinner');
var PayloadStates = require('../../constants/PayloadStates');
var SelectableList = require('../SelectableList');
var Connect = require('../Connect');
var moment = require('moment');
var Tweet = require('./Tweet');

module.exports = lore.connect(function(getState, props){
  return {
    newTweets: getState('tweet.all', {
      where: function(tweet) {
        return !tweet.id || (tweet.data.createdAt - lore.timestamp) > 0
      },
      sortBy: function(tweet) {
        return -tweet.data.createdAt;
      }
    }),
    tweets: getState('tweet.find', {
      where: {
        createdAt_lte: lore.timestamp,
        _sort: 'createdAt',
        _order: 'DESC'
      }
    })
  }
})(
Router.withRouter(React.createClass({
  displayName: 'List',

  propTypes: {
    tweets: React.PropTypes.object.isRequired,
    newTweets: React.PropTypes.object.isRequired
  },

  renderTweet: function(tweet) {
    return (
      <Tweet
        key={tweet.id || tweet.cid}
        value={tweet.id || tweet.cid}
        tweet={tweet}
        nestedItems={[]}
      />
    );
  },

  render: function() {
    var tweets = this.props.tweets;

    if (tweets.state === PayloadStates.FETCHING) {
      return (
        <Spinner/>
      );
    }

    var newTweets = this.props.newTweets.data.map(this.renderTweet);

    return (
      <div>
        <mui.Paper>
          <mui.Subheader>
            Tweets
          </mui.Subheader>
          <SelectableList defaultValue={0}>
            {newTweets}
            {tweets.data.map(this.renderTweet)}
          </SelectableList>
        </mui.Paper>
      </div>
    );
  }

}))
);
