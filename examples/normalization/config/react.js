/**
 * Configuration file for React
 *
 * This file is where you define overrides for the default mounting behavior.
 */

// var React = require('react');
// var ReactDOM = require('react-dom');
// var ReactRedux = require('react-redux');
// var Provider = ReactRedux.Provider;
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;

module.exports = {

  /**
   * ID of DOM Element the application will be mounted to
   */

  // domElementId: 'root',

  /**
   * Generate the root component that will be mounted to the DOM. This
   * function will be invoked by lore after all hooks have been loaded.
   */

  // getRootComponent: function(lore) {
  //   var store = lore.store;
  //   var routes = lore.router.routes;
  //   var history = lore.router.history;
  //
  //   return (
  //     <Provider store={store}>
  //       <Router history={history}>
  //         {routes}
  //       </Router>
  //     </Provider>
  //   );
  // },

  /**
   * Mount the root component to the DOM
   */

  // mount: function(Root, lore) {
  //   var config = lore.config.react;
  //   ReactDOM.render(Root, document.getElementById(config.domElementId), cb);
  // }

};
