var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

// Hook Dialogs
var validators = require('../../utils/validators');
var Template = require('../templates/Template');
var Overlay = require('../common/Overlay');

var tweetConfig = require('../../models/tweet');

module.exports = React.createClass({
  displayName: 'CreateCard.template',

  getInitialState: function() {
    return {
      tweet: null,
      userId: null,
      text: ''
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

  getOptions: function(getState, props) {
    return {
      options: getState('user.find')
    }
  },

  onChange: function(name, value) {
    var state = {};
    state[name] = value;
    this.setState(state);
  },

  getValidators: function(data) {
    return {
      text: [validators.isRequired],
      userId: [validators.number.isRequired]
    }
  },

  getForm: function() {
    var data = this.state;
    var templateParams = _.merge({}, tweetConfig.forms, {
      fields: {
        text: {
          data: data.text
        },
        userId: {
          data: data.userId
        }
      },
      onSubmit: this.onSubmit
    });

    return (
      <Template {...templateParams} />
    );
  },

  render: function() {
    var tweet = this.state.tweet;

    return (
      <Overlay model={tweet}>
        <div className="card form-card">
          <div className="card-block">
            <h4 className="card-title">Template Form</h4>
            <p className="card-text">Created by providing a config to the template used by the forms hook</p>
            {this.getForm()}
          </div>
        </div>
      </Overlay>
    );
  }
});
