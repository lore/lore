/* eslint prefer-spread: "off" */
/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import thunk from 'redux-thunk';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';

export default {

  dependencies: ['reducers'],

  defaults: {
    redux: {

      /**
       * Middleware injected into the dispatch flow, placed at the point between
       * dispatching an action, and the moment it reaches the reducer.
       *
       * http://redux.js.org/docs/advanced/Middleware.html
       */

      middleware: [thunk],

      /**
       * Length of time (in milliseconds) that needs to exist between updates
       * to the Redux store before React is notified the store has changed.
       *
       * A value of zero corresponds to "one tick".
       *
       * https://lodash.com/docs/4.17.4#debounce
       */

      debounceWait: 0,

      /**
       * Enhance the store with third-party capabilities such as middleware,
       * time travel, persistence, etc.
       *
       * http://redux.js.org/docs/api/compose.html
       */

      enhancer: function(middleware, config) {
        return compose(
          applyMiddleware.apply(null, middleware),
          batchedSubscribe(_.debounce(function(notify) {
            notify();
          }, config.redux.debounceWait))
        );
      },

      /**
       * Combine all reducers into a single reducer function, which will be used
       * by the Redux store. If there are no reducers, returns an empty function
       * to prevent Redux from throwing an error.
       *
       * http://redux.js.org/docs/api/combineReducers.html
       */

      rootReducer: function(reducers) {
        const hasReducers = Object.keys(reducers).length > 0;
        return hasReducers ? combineReducers(reducers) : function() {};
      },

      /**
       * Initial state of the Redux store. Any data you specify here will
       * be in the store when the application starts.
       *
       * http://redux.js.org/docs/api/createStore.html
       */

      preloadedState: function() {
        return {};
      },

      /**
       * Configure the Store used by the application
       *
       * http://redux.js.org/docs/api/createStore.html
       */

      configureStore: function(rootReducer, preloadedState, enhancer) {
        return createStore(rootReducer, preloadedState, enhancer);
      }

    }
  },

  load: function(lore) {
    if (!lore.reducers) {
      throw new Error('Error: lore.reducers does not exist. Must load hooks/reducers before hooks/redux');
    }

    const config = lore.config.redux;
    const middleware = config.middleware;
    const enhancer = config.enhancer(middleware, lore.config);
    const rootReducer = config.rootReducer(lore.reducers);
    const preloadedState = config.preloadedState();
    lore.store = config.configureStore(rootReducer, preloadedState, enhancer);
  }

};
