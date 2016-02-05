var React = require('react');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;

module.exports = function (lore) {

  return React.createClass({
    displayName: 'DialogContainer',

    propTypes: {
      dialog: React.PropTypes.object.isRequired
    },

    childContextTypes: {
      history: React.PropTypes.object
    },

    getChildContext: function () {
      return {
        history: lore.config.router.history
      };
    },

    render: function () {
      var dialog = this.props.dialog;

      return React.createElement(Provider, {
        store: lore.store
      }, dialog);
    }
  });
};