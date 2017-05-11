/**
 * Development environment settings
 *
 * This file is where you define overrides for any of the config settings when operating under the development
 * environment. Development environment is defined as `NODE_ENV=development` or the absence of an `NODE_ENV` environment
 * variable.
 **/

import _ from 'lodash';
import React from 'react';
import { applyMiddleware, compose } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { batchedSubscribe } from 'redux-batched-subscribe';

/**
 * Redux DevTools, for a practical and fun development experience
 * https://github.com/gaearon/redux-devtools
 */

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={true}>
    <LogMonitor />
  </DockMonitor>
);

export default {

  /**
   * Override Redux configuration in development to add support for the Redux DevTools
   */

  redux: {

    /**
     * Flag to enable/disable the Redux DevTools
     */

    devToolsEnabled: false,

    /**
     * If DevTools are enabled, enhance the Redux Store with instrumentation support
     */

    enhancer: function(middleware, config) {
      if (config.redux.devToolsEnabled) {
        return compose(
          applyMiddleware.apply(null, middleware),
          DevTools.instrument(),
          batchedSubscribe(_.debounce(function(notify) {
            notify();
          }, config.redux.debounceWait))
        );
      }

      return compose(
        applyMiddleware.apply(null, middleware),
        batchedSubscribe(_.debounce(function(notify) {
          notify();
        }, config.redux.debounceWait))
      );
    }

  },

  /**
   * Override React configuration in development to add support for the Redux DevTools
   */

  react: {

    /**
     * If DevTools are enabled, we need to render them
     */

    getRootComponent: function(lore) {
      const store = lore.store;
      const routes = lore.router.routes;
      const history = lore.router.history;
      const devToolsEnabled = lore.config.redux.devToolsEnabled;

      if (devToolsEnabled) {
        return (
          <Provider store={store}>
            <div>
              <Router history={history}>
                {routes}
              </Router>
              <DevTools />
            </div>
          </Provider>
        );
      }

      return (
        <Provider store={store}>
          <Router history={history}>
            {routes}
          </Router>
        </Provider>
      );
    },
  }

}
