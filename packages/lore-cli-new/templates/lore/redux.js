import _ from 'lodash';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';

export function getStore(config, { reducers={} }, DevTools) {

  /**
   * Middleware injected into the dispatch flow, placed at the point between
   * dispatching an action, and the moment it reaches the reducer.
   *
   * http://redux.js.org/docs/advanced/Middleware.html
   */

  const middleware = [thunk];


  /**
   * Length of time (in milliseconds) that needs to exist between updates
   * to the Redux store before React is notified the store has changed.
   *
   * A value of zero corresponds to "one tick".
   *
   * https://lodash.com/docs/4.17.4#debounce
   */

  const debounceWait = 0;


  /**
   * Enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc.
   *
   * If DevTools are provided, enhance the Redux Store with instrumentation support.
   *
   * http://redux.js.org/docs/api/compose.html
   */

  const enhancer = DevTools ? (
    compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      batchedSubscribe(_.debounce(function(notify) {
        notify();
      }, debounceWait))
    )
  ) : (
    compose(
      applyMiddleware(...middleware),
      batchedSubscribe(_.debounce(function(notify) {
        notify();
      }, debounceWait))
    )
  );


  /**
   * Combine all reducers into a single reducer function, which will be used
   * by the Redux store. If there are no reducers, returns an empty function
   * to prevent Redux from throwing an error.
   *
   * http://redux.js.org/docs/api/combineReducers.html
   */

  const hasReducers = Object.keys(reducers).length > 0;
  const rootReducer = hasReducers ? combineReducers(reducers) : function() {};


  /**
   * Initial state of the Redux store. Any data you specify here will
   * be in the store when the application starts.
   *
   * http://redux.js.org/docs/api/createStore.html
   */

  const preloadedState = {};


  /**
   * Configure the Store used by the application
   *
   * http://redux.js.org/docs/api/createStore.html
   */

  return createStore(rootReducer, preloadedState, enhancer);
}
