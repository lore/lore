/**
 * Configuration file for Redux
 *
 * This file is where you define overrides for the default Redux behavior.
 */

// import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
// import { thunk } from 'redux-thunk';
// import { batchedSubscribe } from 'redux-batched-subscribe';
// import _ from 'lodash';

export default {

  /**
   * Middleware injected into the dispatch flow, placed at the point between
   * dispatching an action, and the moment it reaches the reducer.
   *
   * http://redux.js.org/docs/advanced/Middleware.html
   */

  // middleware: [thunk],

  /**
   * Length of time (in milliseconds) that needs to exist between updates
   * to the Redux store before React is notified the store has changed.
   * A value of zero corresponds to "one tick".
   *
   * https://lodash.com/docs/4.17.4#debounce
   */

  // debounceWait: 0,

  /**
   * Enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc.
   *
   * http://redux.js.org/docs/api/compose.html
   *
   * Note about the batchedSubscribe enhancer:
   *
   * When normalization is configured and enabled, action creators can end up
   * firing multiple actions back-to-back. By default, these actions do not
   * get batched by Redux (it notifies React that the store changed after every
   * action), which means every action will cause React to re-render the application.
   * When this occurs back-to-back over a very short period of time, the responsiveness
   * (and usability) of the application can drop noticeably.
   *
   * The batchedSubscribe enhancer, combined with the use of the _.debounce function,
   * is a way of preventing this behavior, by preventing Redux from notifying React
   * about changes to the Store until at least X time has passed between updates.
   *
   * Lore sets this value to 0 by default, which translates to "one tick". This delay
   * should be undetectable to users, but just long enough to make sure that all actions
   * from a normalized response are processed before React is notified of the change.
   */

  // enhancer: function(middleware, config) {
  //   return compose(
  //     applyMiddleware.apply(null, middleware),
  //     batchedSubscribe(_.debounce(function(notify) {
  //       notify();
  //     }, config.redux.debounceWait))
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
  //   const hasReducers = Object.keys(reducers).length > 0;
  //   return hasReducers ? combineReducers(reducers) : function() {};
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
  //   return createStore(rootReducer, preloadedState, enhancer);
  // }

}
