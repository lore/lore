/**
 * This file is where you define overrides for the default routing behavior.
 **/

// var browserHistory = require('react-router').browserHistory;

module.exports = {

  /**
   * Whether browser should use pushState or hash to keep track of routes
   * See: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
   **/

  // history: browserHistory,

  /**
   * Returns the routes used by the application.
   *
   * The 'lore.loader' object is a way of lazy-loading files and directories the framework
   * doesn't have control over such as the models, config directory, and in this case the
   * routes.js file at the root of the project.
   *
   * The reason the loader is used here is because the routes _must_ to be lazy-loaded,
   * since loading the routes will pull in the components, which may be using the
   * 'lore.connect' decorator that won't exist until the 'connect' hooks loads.
   *
   * Trying to load the routes directly in this config file will throw an error during
   * build, because lore loads the config file _before_ any of the hooks, since they
   * need information in the config to determine their behavior.
   */

  // routes: function(lore) {
  //   return lore.loader.loadRoutes();
  // }

};
