var React = require('react');
var mui = require('material-ui');
var PayloadStates = require('../../constants/PayloadStates');
var _ = require('lodash');
var moment = require('moment');

module.exports = React.createClass({
  displayName: 'CreateCard.hook',

  getInitialState: function() {
    return {
      user: null
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var user = this.state.user;

    if (!user) {
      return;
    }

    var nextUser = lore.store.getState().user.byCid[user.cid];

    if (nextUser.state === PayloadStates.RESOLVED) {
      this.setState({
        user: null
      })
    } else {
      this.setState({
        user: nextUser
      })
    }
  },

  onSubmit: function(params) {
    var action = lore.actions.user.create(_.extend({
      createdAt: moment().unix()
    }, params));
    this.setState({
      user: action.payload
    });
  },

  render: function() {
    var user = this.state.user;

    return lore.forms.user.create({
      template: 'card',
      title: 'Hook Form',
      subtitle: 'Created by providing a config to the forms hook',
      model: user,
      onSubmit: this.onSubmit
    });
  }

});
