 /**
 * This file is where you define overrides for the default routing behavior.
 * Currently this includes how you want your routing display (using hash
 * history or push state).
 **/

var browserHistory = require('react-router').browserHistory;

module.exports = {

  /************************************************************************************
  *                                                                                   *
  * Whether browser should use pushState or hash to keep track of routes              *
  * See: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md *
  *                                                                                   *
  *************************************************************************************/

  history: browserHistory,

  /**
   * Note about Routes
   *
   * Routes _must_ be loaded after all hooks, because decorators like
   */

  routes: function(lore) {
    return lore.loader.loadRoutes();
  }

};
