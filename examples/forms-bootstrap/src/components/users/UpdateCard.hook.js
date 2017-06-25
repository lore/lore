var React = require('react');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'UpdateCard.hook',

  propTypes: {
    user: React.PropTypes.object
  },

  onSubmit: function(params) {
    var user = this.props.user;
    lore.actions.user.update(user, params);
  },

  render: function() {
    var user = this.props.user;

    return lore.forms.user.update(user, {
      template: 'card',
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: user,
      onSubmit: this.onSubmit
    });
  }
});
