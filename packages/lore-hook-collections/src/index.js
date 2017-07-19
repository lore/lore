/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { Collection } from 'lore-models';
import generateProperties from './generateProperties';

function getConnectionName(config, collectionName) {
  let connection = config.defaultConnection;
  const connectionModelMap = config.connectionModelMap;

  _.mapKeys(connectionModelMap, function(models, connectionName) {
    if (models.indexOf(collectionName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}

export default {
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
    const config = lore.config;
    const connections = lore.connections;
    lore.collections = {};

    const modelModules = lore.loader.loadModels();
    const collectionModules = lore.loader.loadCollections();
    const modules = _.assign({}, modelModules, collectionModules);

    _.mapKeys(modules, function(module, moduleName) {
      // todo: currently setting the collection name to the filename, but
      // should change to be PascalCase, like lore.collections.CollectionName
      const collectionName = moduleName;

      // get the connection for this model
      const connection = connections[getConnectionName(config.models, collectionName)];

      // Create the final set of properties for the Collection
      const properties = generateProperties(collectionName, {
        collectionsConfig: config.collections,
        collectionDefinition: collectionModules[collectionName],
        modelsConfig: config.models,
        modelDefinition: modelModules[collectionName],
        connection: connection
      });

      // If a model hasn't already been provided for the collection, and one with that
      // name currently exists, set the collection's model to that one
      const model = lore.models[collectionName];
      if (!properties.model && model) {
        properties.model = model;
      }

      lore.collections[collectionName] = Collection.extend(properties);
    });
  }
};
