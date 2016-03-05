var actionsLoader = require('./loaders/actions');
var collectionsLoader = require('./loaders/collections');
var configLoader = require('./loaders/config');
var modelsLoader = require('./loaders/models');
var reducersLoader = require('./loaders/reducers');
var routesLoader = require('./loaders/routes');

/**
 * Create a set of functions capable of loading files from disk, or (in the case of Webpack) communicating
 * to Webpack that they should be included as part of the bundle.
 *
 * The loaders were abstracted out into this interface in order to support testing, as Webpack requires
 * the use of require.context in order to dynamically specify groups of files to load BEFORE they're required,
 * where as Node doesn't have a require.context method (as all file loading is synchronous).
 *
 * TODO: Look into mocking out require.context() in tests to remove Webpack warnings
 *
 * @param config Final application config
 * @returns {Object} Set of loaders to be exposed
 */
module.exports = function(config) {
  return {
    loadUserConfig: function() {
      return configLoader.load(config.environment);
    },

    loadModels: function() {
      return modelsLoader.load();
    },

    loadCollections: function() {
      return collectionsLoader.load();
    },

    loadActions: function() {
      return actionsLoader.load();
    },

    loadReducers: function() {
      return reducersLoader.load();
    },

    loadRoutes: function() {
      return routesLoader.load();
    }
  };
};
