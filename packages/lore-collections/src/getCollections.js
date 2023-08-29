import _ from 'lodash';
import { Collection } from '@lore/backbone';
import { getUrlRoot } from '@lore/models';
import { getConnectionName } from '@lore/connection-map';

/*
 * Generate a Collection for each module definition
 */

export function getCollections(config={}, resources={}, modules={}) {
  const {
    connections: connections,
    connectionMap: {
      connectionMap,
      defaultConnection
    },
    collections: collections,
    models: models
  }  = config;

  const { models: Models } = resources;

  /*
   * Combine src/models and src/collections to obtain the full set of collections,
   * which derive their name and default behavior from the list of models.
   *
   */

  const _modules = _.assign({},
    _.reduce(modules.models, function(result, value, key) {
      result[key] = _.omit(value, ['properties']);
      return result;
    }, {}),
    modules.collections
  );

  return _.mapValues(_modules, function(module, moduleName) {

    /**
     * Set the collection name to the module (file) name by default
     */

    const collectionName = moduleName;

    /**
     * Get the name of the connection this model should use
     */

    const connectionName = getConnectionName(collectionName, {
      connectionMap,
      defaultConnection
    });

    /**
     * Get the connection settings this model should use
     */

    const connection = connections[connectionName];

    /**
     * Combine config/collections and config/models for the given
     * connection (excluding properties in config/models) to get
     * the final configuration
     */

    const collectionsConfig = collections[connectionName] || {};
    const modelsConfig = models[connectionName] || {};

    const config = _.defaultsDeep({},
      collectionsConfig,
      _.omit(modelsConfig, 'properties')
    );

    /**
     * Combine configs for the connection, models, and module definition to
     * get final settings apiRoot, pluralization, casing style, and endpoint
     */

    const combinedConfig = _.merge({}, connection, config, module);

    /**
     * Generate urlRoot from conventions and default headers to value in
     * connection (or model definition if provided)
     */

    const conventions = {
      properties: {
        url: getUrlRoot(collectionName, _.pick(combinedConfig, [
          'apiRoot',
          'pluralize',
          'casingStyle',
          'endpoint'
        ])),
        headers: _.get(modules.models[collectionName], 'properties.headers') || connection.headers
      }
    };

    /*
     * Build the final set of properties for the model. Properties in src/collections
     * take priority, following by config/collections, and then properties generated
     * from conventions
     */

    const properties = _.defaultsDeep({},
      module.properties,
      collectionsConfig.properties,
      conventions.properties
    );

    /*
     * If a model hasn't already been provided for the collection, and one with that
     * name currently exists, set the collection's model to that one
     */

    const model = Models[collectionName];
    if (!properties.model && model) {
      properties.model = model;
    }

    return Collection.extend(properties);
  });
}
