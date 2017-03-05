/**
 * Configuration file for Redux
 *
 * This file is where you define overrides for the default Redux behavior.
 */

// var Redux = require('redux');
// var thunk = require('redux-thunk').default;

module.exports = {

  /**
   * Middleware injected into the dispatch flow, placed at the point between
   * dispatching an action, and the moment it reaches the reducer.
   *
   * http://redux.js.org/docs/advanced/Middleware.html
   */

  // middleware: [thunk],

  /**
   * Enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc.
   *
   * http://redux.js.org/docs/api/compose.html
   */

  // enhancer: function(middleware) {
  //   return Redux.compose(
  //     Redux.applyMiddleware.apply(null, middleware)
  //   );
  // },

  /**
   * Combine all reducers into a single reducer function, which will be used
   * by the Redux store. If there are no reducers, returns an empty function
   * to prevent Redux from throwing an error.
   *
   * http://redux.js.org/docs/api/combineReducers.html
   */

  // rootReducer: function(reducers) {
  //   var hasReducers = Object.keys(reducers).length > 0;
  //   return hasReducers ? Redux.combineReducers(reducers) : function() {};
  // },

  /**
   * Initial state of the Redux store. Any data you specify here will
   * be in the store when the application starts.
   *
   * http://redux.js.org/docs/api/createStore.html
   */

  // preloadedState: function() {
  //   return {};
  // },

  /**
   * Configure the Store used by the application
   *
   * http://redux.js.org/docs/api/createStore.html
   */

  // configureStore: function(rootReducer, preloadedState, enhancer) {
  //   return Redux.createStore(rootReducer, preloadedState, enhancer);
  // }

};
