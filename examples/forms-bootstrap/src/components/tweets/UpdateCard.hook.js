var React = require('react');
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
  displayName: 'UpdateCard.hook',

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
        <div>Loading...</div>
      )
    }

    return lore.forms.tweet.update(tweet, {
      template: 'card',
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }
})
);
