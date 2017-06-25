var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

module.exports = React.createClass({
  displayName: 'CreateCard.hook',

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
      template: 'card',
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: tweet,
      onSubmit: this.onSubmit
    });
  }

});
