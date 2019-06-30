import _ from 'lodash';
import buildDictionary from 'webpack-requiredir';
import { Model } from '@lore/backbone';
import { getUrlRoot } from '@lore/models';
import { getConnectionName } from '@lore/connection-map';

/*
 * Import all files in src/models and convert into a dictionary, where the key
 * is the name of the file
 */

const modules = buildDictionary(require.context('../src/models', false, /\.js$/));

/*
 * Generate a Model for each module definition
 */

export function getModels(config) {
  const {
    connections: connections,
    connectionMap: {
      connectionMap,
      defaultConnection
    },
    models: models
  }  = config;

  return _.mapValues(modules, function(module, moduleName) {

    /**
     * Set the model name to the module (file) name by default
     */

    const modelName = moduleName;

    /**
     * Get the name of the connection this model should use
     */

    const connectionName = getConnectionName(modelName, {
      connectionMap,
      defaultConnection
    });

    /**
     * Get the connection settings this model should use
     */

    const connection = connections[connectionName];

    /**
     * Get the models config for the given connection
     */

    const modelsConfig = models[connectionName] || {};

    /**
     * Combine configs for the connection, models, and module definition to
     * get final settings apiRoot, pluralization, casing style, and endpoint
     */

    const combinedConfig = _.merge({}, connection, modelsConfig, module);

    /**
     * Generate urlRoot from conventions and default headers to value in connection
     */

    const conventions = {
      properties: {
        urlRoot: getUrlRoot(modelName, _.pick(combinedConfig, [
          'apiRoot',
          'pluralize',
          'casingStyle',
          'endpoint'
        ])),
        headers: connection.headers
      }
    };

    /*
     * Build the final set of properties for the model. Properties in src/models
     * take priority, following by config/models, and then properties generated
     * from conventions
     */

    const properties = _.defaultsDeep({},
      module.properties,
      modelsConfig.properties,
      conventions.properties
    );

    return Model.extend(properties);
  });
}
