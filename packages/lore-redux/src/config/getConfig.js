/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * Placeholder for obtaining Redux DevTools
     *
     * https://github.com/gaearon/redux-devtools
     */

    getDevTools: function() {},


    /**
     * Placeholder for obtaining DockMonitor for mounting Redux DevTools
     *
     * https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md#manual-integration
     */

    getDockMonitor: function(DevTools, store) {}

  }, configOverride);
}

export default getConfig;
