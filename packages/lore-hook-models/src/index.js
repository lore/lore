/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { Model } from 'lore-models';
import generateProperties from './generateProperties';

function getConnectionName(config, modelName) {
  let connection = config.defaultConnection;
  const connectionModelMap = config.connectionModelMap;

  _.mapKeys(connectionModelMap, function(models, connectionName) {
    if (models.indexOf(modelName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}

export default {
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
    const models = lore.loader.loadModels();
    const config = lore.config.models;
    const connections = lore.connections;
    lore.models = {};

    _.mapKeys(models, function(module, moduleName) {
      // todo: currently setting the modelName to the filename, but
      // should change to be PascalCase, like lore.models.ModelName
      const modelName = moduleName;

      // get the connection for this model
      const connection = connections[getConnectionName(config, modelName)];

      // Cascaded series of defaults to define the models final properties
      // 1. Start from anything the user defined in the collections's config
      // 2. Add any missing application level settings from config.models
      // 2. Add any missing settings from conventions
      const properties = generateProperties(modelName, {
        config: config,
        connection: connection,
        definition: module
      });

      lore.models[modelName] = Model.extend(properties);
    });
  }

};
