var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

// Hook Dialogs
var withMuiTheme = require('../../decorators/withMuiTheme').default;
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

  getForm: function() {
    debugger
    var data = this.state;
    var templateProps = _.merge({}, tweetConfig.forms, {
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
      <Template {...templateProps} />
    );
  },

  render: function() {
    var tweet = this.state.tweet;

    return (
      <Overlay model={tweet}>
        <mui.Card className="form-card">
          <mui.CardTitle
            title="Template Form"
            subtitle="Created by providing a config to the template used by the forms hook" />
          {this.getForm()}
        </mui.Card>
      </Overlay>
    );
  }
});
