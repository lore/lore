var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

// Hook Dialogs
var validators = require('../../utils/validators');
var Overlay = require('../common/Overlay');

var Template = require('../templates/Template');

var tweetConfig = require('../../models/tweet');

module.exports = lore.connect(function(getState, props){
  return {
    user: getState('user.byId', {
      id: props.tweet.data.userId
    })
  }
})(
React.createClass({
  displayName: 'UpdateCard.template',

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

  onSubmit: function() {
    var tweet = this.props.tweet;
    var params = this.state;
    lore.actions.tweet.update(tweet, params);
  },

  getForm: function() {
    var data = this.state;

    return React.createElement(Template, _.merge({}, tweetConfig.forms, {
      fields: {
        text: {
          data: data.text
        },
        userId: {
          data: data.userId
        }
      },
      onSubmit: this.onSubmit
    }));
  },

  render: function() {
    var tweet = this.props.tweet;
    var user = this.props.user;

    return (
      <Overlay model={tweet}>
        <div className="card form-card">
          <div className="card-block">
            <h4 className="card-title">Template Form</h4>
            <p className="card-text">Created by providing a config to the template used by the forms hook</p>
            {user.state === PayloadStates.RESOLVED ? this.getForm() : <Spinner />}
          </div>
        </div>
      </Overlay>
    );
  }
})
);
