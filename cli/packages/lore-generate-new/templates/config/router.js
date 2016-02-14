var createHashHistory = require('history/lib/createHashHistory');

module.exports = {

  /****************************************************************************
  *                                                                           *
  * Whether browser should use pushState or hash to keep track of routes      *
  * See: https://github.com/rackt/history                                     *
  *                                                                           *
  ****************************************************************************/

  history: createHashHistory()

};
