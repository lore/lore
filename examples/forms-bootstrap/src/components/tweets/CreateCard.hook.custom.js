var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');
var tweetConfig = require('../../models/tweet');

module.exports = React.createClass({
  displayName: 'CreateCard.hook.custom',

  getInitialState: function() {
    return {
      tweet: null
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var tweet = this.state.tweet;

    if (!tweet) {
      return;
    }

    var nextTweet = lore.store.getState().tweet.byCid[tweet.cid];

    if (nextTweet.state === PayloadStates.RESOLVED) {
      this.setState({
        tweet: null
      })
    } else {
      this.setState({
        tweet: nextTweet
      })
    }
  },

  onSubmit: function(params) {
    var action = lore.actions.tweet.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      tweet: action.payload
    });
  },

  render: function() {
    var tweet = this.state.tweet;

    return lore.forms.tweet.create({
      template: 'custom',
      title: 'Hook Form with Custom Template',
      footer: 'This is some footer text',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }

});
