/**
 * Configuration file for Redux
 *
 * This file is where you define overrides for the default Redux behavior.
 */

import { getConfig } from '@lore/redux';

export default getConfig({

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

})
