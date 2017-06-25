var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

module.exports = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
React.createClass({
  displayName: 'CustomUpdateCard.hook',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },

  onSubmit: function(params) {
    var tweet = this.props.tweet;
    lore.actions.tweet.update(tweet, params);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;

    if (user.state === PayloadStates.FETCHING) {
      return (
        <mui.CircularProgress />
      );
    }

    return lore.forms.tweet.update(tweet, {
      template: 'custom',
      title: 'Hook Form with Custom Template',
      footer: 'This is some footer text',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }
})
);
