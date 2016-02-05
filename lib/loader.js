var actionsLoader = require('./loaders/actions');
var collectionsLoader = require('./loaders/collections');
var configLoader = require('./loaders/config');
var modelsLoader = require('./loaders/models');
var reducersLoader = require('./loaders/reducers');
var routesLoader = require('./loaders/routes');

module.exports = function (config) {
  return {
    loadUserConfig: function () {
      return configLoader.load(config.environment);
    },

    loadModels: function () {
      return modelsLoader.load();
    },

    loadCollections: function () {
      return collectionsLoader.load();
    },

    loadActions: function () {
      return actionsLoader.load();
    },

    loadReducers: function () {
      return reducersLoader.load();
    },

    loadRoutes: function () {
      return routesLoader.load();
    }
  };
};