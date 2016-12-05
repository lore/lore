var LoreModels = require('lore-models');
var _ = require('lodash');
var generateProperties = require('./generateProperties');

function getConnectionName(config, modelName) {
  var connection = config.defaultConnection;
  var connectionModelMap = config.connectionModelMap;

  _.mapKeys(connectionModelMap, function(models, connectionName) {
    if (models.indexOf(modelName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}

module.exports = {
  dependencies: ['connections'],

  defaults: {
    models: {
      defaultConnection: 'default',
      // apiRoot: 'https://api.example.com',
      // pluralize: true,
      // properties: {},
      // endpoint: 'custom_non-model_name',
      // models: {}
      connectionModelMap: {
        // default: [...model names...]
      }
    }
  },

  load: function(lore) {
    var models = lore.loader.loadModels();
    var config = lore.config.models;
    var connections = lore.connections;
    lore.models = {};

    _.mapKeys(models, function(module, moduleName) {
      // todo: currently setting the modelName to the filename, but
      // should change to be PascalCase, like lore.models.ModelName
      var modelName = moduleName;

      // get the connection for this model
      var connection = connections[getConnectionName(config, modelName)];

      // Cascaded series of defaults to define the models final properties
      // 1. Start from anything the user defined in the collections's config
      // 2. Add any missing application level settings from config.models
      // 2. Add any missing settings from conventions
      var properties = generateProperties(modelName, {
        config: config,
        connection: connection,
        definition: module
      });

      lore.models[modelName] = LoreModels.Model.extend(properties);
    });
  }

};
