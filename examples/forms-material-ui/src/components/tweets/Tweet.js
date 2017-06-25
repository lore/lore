var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var _ = require('lodash');
var moment = require('moment');

var Tweet = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
Router.withRouter(React.createClass({
  displayName: 'Tweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  onTouchTap: function() {
    var tweet = this.props.tweet;
    this.props.router.push('/tweets/' + tweet.id);
    this.props.onTouchTap.apply(arguments);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var timestamp = moment.unix(tweet.data.createdAt).fromNow().split(' ago')[0];

    // get the props from the SelectableList that need to be passed down
    var other = _.omit(this.props, ['user', 'tweet', 'router', 'params', 'location', 'routes']);

    return (
      <mui.ListItem
        {...other}
        leftAvatar={<mui.Avatar src={user.data.avatar} />}
        primaryText={(
          <span>
            <span>{user.data.username}</span>
            <span className="timestamp">- {timestamp}</span>
          </span>
        )}
        secondaryText={tweet.data.text}
        secondaryTextLines={2}
        onTouchTap={this.onTouchTap}
      />
    );
  }

}))
);

// we need to provide a muiName in order for SelectableList to recognize this component as a mui.ListItem
Tweet.muiName = 'ListItem';

module.exports = Tweet;
