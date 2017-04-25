/**
 * Development environment settings
 *
 * This file is where you define overrides for any of the config settings that
 * should only be applied in the development environment.
 *
 * The development environment is defined as 'process.env.NODE_ENV=development' and
 * is automatically set when webpack is invoked using the --env=development argument.
 *
 * The development environment is also the default when no environment is specified.
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
            notify();
          }, config.redux.debounceWait))
        );
      }

      return Redux.compose(
        Redux.applyMiddleware.apply(null, middleware),
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
