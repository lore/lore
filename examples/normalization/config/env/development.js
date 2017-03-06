/**
 * Development environment settings
 *
 * This file is where you define overrides for any of the config settings when operating under the development
 * environment. Development environment is defined as `NODE_ENV=development` or the absence of an `NODE_ENV` environment
 * variable.
 **/

var _ = require('lodash');
var React = require('react');
var Redux = require('redux');
var ReduxDevTools = require('redux-devtools');
var LogMonitor = require('redux-devtools-log-monitor').default;
var DockMonitor = require('redux-devtools-dock-monitor').default;
var Provider = require('react-redux').Provider;
var Router = require('react-router').Router;
var batchedSubscribe = require('redux-batched-subscribe').batchedSubscribe;

/**
 * Redux DevTools, for a practical and fun development experience
 * https://github.com/gaearon/redux-devtools
 */

var DevTools = ReduxDevTools.createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={true}>
    <LogMonitor />
  </DockMonitor>
);

module.exports = {

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
        return Redux.compose(
          Redux.applyMiddleware.apply(null, middleware),
          DevTools.instrument(),
          batchedSubscribe(_.debounce(function(notify) {
            console.log('notify()');
            notify();
          }, 0))
        );
      }

      return Redux.compose(
        Redux.applyMiddleware.apply(null, middleware),
        batchedSubscribe(_.debounce(function(notify) {
          console.log('notify()');
          notify();
        }, 0))
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
      var store = lore.store;
      var routes = lore.router.routes;
      var history = lore.router.history;
      var devToolsEnabled = lore.config.redux.devToolsEnabled;

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

};
