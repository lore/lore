var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

module.exports = {

  /**
   * ID of DOM Element the application will be mounted to
   */

  domElementId: 'root',

  /**
   * Generate the root component that will be mounted to the DOM
   *
   * @param lore -
   * @returns {Component}
   */

  getRootComponent: function(lore) {
    var store = lore.store;
    var routes = lore.router.routes;
    var history = lore.router.history;

    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  },

  /**
   * Mount the root component to the DOM
   *
   * @param Root - component returned from getRootComponent()
   * @param cb - callback to signal the application has been mounted
   */

  mount: function(Root, cb) {
    var config = lore.config.react;
    ReactDOM.render(Root, document.getElementById(config.domElementId), cb);
  }

};
