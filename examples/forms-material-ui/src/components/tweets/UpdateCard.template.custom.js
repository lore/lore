var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

var tweetConfig = require('../../models/tweet');
var Template = require('../templates/CardFormTemplate');

module.exports = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
React.createClass({
  displayName: 'CustomUpdateCard.template',

  propTypes: {
    tweet: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    var tweet = this.props.tweet;
    return {
      userId: tweet.data.userId,
      text: tweet.data.text
    }
  },

  onSubmit: function(params) {
    var params = this.state;
    var tweet = this.props.tweet;
    lore.actions.tweet.update(tweet, params);
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;
    var data = this.state;

    if (user.state === PayloadStates.FETCHING) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Template
        title="Custom Template Form"
        subtitle="Created by providing a config to a custom template"
        model={tweet}
        config={_.merge({}, tweetConfig.forms, {
          fields: {
            text: {
              data: data.text
            },
            userId: {
              data: data.userId
            }
          },
          onSubmit: this.onSubmit
        })} />
    );
  }

})
);
