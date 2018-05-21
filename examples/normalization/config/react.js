/**
 * Configuration file for React
 *
 * This file is where you define overrides for the default mounting behavior.
 */

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router } from 'react-router';

export default {

  /**
   * ID of DOM Element the application will be mounted to
   */

  // domElementId: 'root',

  /**
   * Generate the root component that will be mounted to the DOM. This
   * function will be invoked by lore after all hooks have been loaded.
   */

  // getRootComponent: function(lore) {
  //   const store = lore.store;
  //   const routes = lore.router.routes;
  //   const history = lore.router.history;
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
  //   const config = lore.config.react;
  //   ReactDOM.render(Root, document.getElementById(config.domElementId), cb);
  // }

}
