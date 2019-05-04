import _ from 'lodash';
import getUrlRoot from './getUrlRoot';

export default function getConventionProperties(modelName, options) {
  const {
    connection={},
    config={},
    definition={}
  } = options;

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connections, models and the individual model definition
   */
  const combinedConfig = _.merge({}, connection, config, definition);
  return {
    urlRoot: getUrlRoot(modelName, _.pick(combinedConfig, [
      'apiRoot',
      'isPlural',
      'casingStyle',
      'endpoint'
    ])),
    headers: connection.headers
  };
}
