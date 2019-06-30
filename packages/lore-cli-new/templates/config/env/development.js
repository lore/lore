/**
 * Development environment settings
 *
 * This file is where you define overrides for any of the config settings when operating under the
 * development environment. Development environment is defined as `LORE_ENV=development` or the absence
 * of a `LORE_ENV` environment variable.
 */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { Provider } from 'react-redux';


/**
 * Flag to enable/disable the Redux DevTools
 */

const devToolsEnabled = false;


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
     * Obtain the Redux DevTools.
     *
     * https://github.com/gaearon/redux-devtools
     */

    getDevTools: function() {
      if (devToolsEnabled) {
        return DevTools;
      }
    },

    /**
     * Obtain the DockMonitor for mounting Redux DevTools. It must be wrapped with Provider
     * from react-redux in order for it to work.
     *
     * https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md#manual-integration
     */

    getDockMonitor: function(store) {
      if (devToolsEnabled) {
        return (
          <Provider store={store}>
            <DevTools/>
          </Provider>
        );
      }
    }

  }

}
