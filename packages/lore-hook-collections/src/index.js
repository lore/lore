var LoreModels = require('lore-models');
var _ = require('lodash');
var generateProperties = require('./generateProperties');

function getConnectionName(config, collectionName) {
  var connection = config.defaultConnection;
  var connectionModelMap = config.connectionModelMap;

  _.mapKeys(connectionModelMap, function(models, connectionName) {
    if (models.indexOf(collectionName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}

module.exports = {
  dependencies: ['connections', 'models'],

  defaults: {
    collections: {
      defaultConnection: 'default',
      //apiRoot: 'https://api.example.com',
      //pluralize: true,
      //properties: {}
    }
  },

  load: function(lore) {
    var config = lore.config;
    var connections = lore.connections;
    lore.collections = {};

    var modelModules = lore.loader.loadModels();
    var collectionModules = lore.loader.loadCollections();
    var modules = _.assign({}, modelModules, collectionModules);

    _.mapKeys(modules, function(module, moduleName) {
      // todo: currently setting the collection name to the filename, but
      // should change to be PascalCase, like lore.collections.CollectionName
      var collectionName = moduleName;

      // get the connection for this model
      var connection = connections[getConnectionName(config.models, collectionName)];

      // Create the final set of properties for the Collection
      var properties = generateProperties(collectionName, {
        collectionsConfig: config.collections,
        collectionDefinition: collectionModules[collectionName],
        modelsConfig: config.models,
        modelDefinition: modelModules[collectionName],
        connection: connection
      });

      // If a model hasn't already been provided for the collection, and one with that
      // name currently exists, set the collection's model to that one
      var model = lore.models[collectionName];
      if (!properties.model && model) {
        properties.model = model;
      }

      lore.collections[collectionName] = LoreModels.Collection.extend(properties);
    });
  }
};
