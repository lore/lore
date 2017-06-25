var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

// Hook Dialogs
var withMuiTheme = require('../../decorators/withMuiTheme').default;
var validators = require('../../utils/validators');
// var Template = require('../../../hooks/lore-hook-forms-material-ui/Template');
var Template = require('../templates/Template');
var Overlay = require('../common/Overlay');

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
        <mui.Card className="form-card">
          <mui.CardTitle
            title="Template Form"
            subtitle="Created by providing a config to the template used by the forms hook" />
          {user.state === PayloadStates.RESOLVED ? this.getForm() : <mui.CircularProgress />}
        </mui.Card>
      </Overlay>
    );
  }
})
);
