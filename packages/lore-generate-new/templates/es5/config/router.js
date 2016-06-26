 /**
 * This file is where you define overrides for the default routing behavior.
 * Currently this includes how you want your routing display (using hash
 * history or push state).
 **/

var createBrowserHistory = require('history/lib/createBrowserHistory');

module.exports = {

  /****************************************************************************
  *                                                                           *
  * Whether browser should use pushState or hash to keep track of routes      *
  * See: https://github.com/rackt/history                                     *
  *                                                                           *
  ****************************************************************************/

  history: createBrowserHistory()

};
