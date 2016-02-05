var React = require('react');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

module.exports = function getRoot(store, routes) {

  function renderRoutes(history) {
    return React.createElement(
      Router, {
        history: history
      },
      routes
    );
  }

  var Root = React.createClass({
    displayName: 'Root',

    propTypes: {
      history: React.PropTypes.object.isRequired
    },

    render: function render() {
      var history = this.props.history;

      return React.createElement(Provider, {
          store: store
        },
        renderRoutes(history)
      );
    }
  });

  return Root;
};
