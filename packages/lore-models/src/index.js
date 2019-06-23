/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { Model } from '@lore/backbone';
import generateProperties from './generateProperties';
import getConnectionName from './getConnectionName';

export { getConfig } from './getConfig';
export { ModelsContext } from './ModelsContext';
export { getUrlRoot } from './getUrlRoot';

export function getModels(options) {
  const {
    modules,
    config,
    connections,
    connectionMap,
    defaultConnection
  } = options;

  const result = {};

  _.mapKeys(modules, function(module, moduleName) {
    // Currently setting the modelName to the filename, but may want
    // to consider changing it to PascalCase
    const modelName = moduleName;

    // get the connection for this model
    const connection = connections[getConnectionName(modelName, {
      connectionMap,
      defaultConnection
    })];

    // Cascaded series of defaults to define the models final properties
    // 1. Start from anything the user defined in the collections's config
    // 2. Add any missing application level settings from config.models
    // 2. Add any missing settings from conventions
    const properties = generateProperties(modelName, {
      config: config,
      connection: connection,
      definition: module
    });

    result[modelName] = Model.extend(properties);
  });

  return result;
}
