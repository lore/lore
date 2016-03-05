var React = require('react');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

/**
 * Build the root React component that will be mounted to the DOM. Basic application
 * boilerplate that knows how to connect the app to the Redux store and configure
 * react-router for proper application navigation.
 *
 * @param {Store} store Redux store
 * @param {Component} routes Set of react-router routes
 * @returns {Component} The React component that will be mounted to the DOM
 */
module.exports = function getRoot(store, routes) {

  function renderRoutes(history) {
    return React.createElement(
      Router, {
        history: history
      },
      routes
    );
  }

  /*
   * The Root component that should be mounted to the DOM, which wraps the {Provider} from Redux (which
   * adds store to context) and the {Router} from React-Router.
   *
   * In JSX syntax the component looks like this:
   *
   * <Provider store={store}>
   *   <Router history={history}>
   *     {routes}
   *   </Router>
   * </Provider>
   */
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
