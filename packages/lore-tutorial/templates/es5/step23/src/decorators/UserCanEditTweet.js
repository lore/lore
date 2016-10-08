var _ = require('lodash');
var React = require('react');
var AuthorizationGenerator = require('lore-auth').generators.AuthorizationGenerator;

module.exports = AuthorizationGenerator({
  wrapperDisplayName: 'UserCanEditTweet',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  isAuthorized: function (storeState) {
    var tweet = this.props.tweet;
    var user = storeState.user.current;

    return tweet.data.user === user.id;
  }

});
