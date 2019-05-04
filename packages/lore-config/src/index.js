/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { Collection } from '@lore/backbone';
import generateProperties from './generateProperties';
import getConnectionName from './getConnectionName';
import loader from './loader';
export { getConfig } from './getConfig';

export { CollectionsContext } from './CollectionsContext';

export const getCollections = function(configOverride, connections, models) {
  const config = getConfig(configOverride);
  const modelModules = loader.loadModels();
  const collectionModules = loader.loadCollections();
  const modules = _.assign({}, modelModules, collectionModules);

  const result = {};

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
    const model = models[collectionName];
    if (!properties.model && model) {
      properties.model = model;
    }

    result[collectionName] = Collection.extend(properties);
  });

  return result;
};
