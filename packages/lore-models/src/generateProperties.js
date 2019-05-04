import _ from 'lodash';
import getUrlRoot from './getUrlRoot';

export default function(modelName, options) {
  const {
    connection={},
    config={},
    definition={}
  } = options;

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connection, models and the individual model definition
   */
  const combinedConfig = _.merge({}, connection, config, definition);
  const conventions = {
    properties: {
      urlRoot: getUrlRoot(modelName, _.pick(combinedConfig, [
        'apiRoot',
        'isPlural',
        'casingStyle',
        'endpoint'
      ])),
      headers: connection.headers
    }
  };

  // Build the final set of properties for the collection
  return _.defaultsDeep(
    {},
    definition.properties,
    config.properties,
    connection.models.properties,
    conventions.properties
  );
}
