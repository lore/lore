import pluralize from 'pluralize';
import _ from 'lodash';

const CasingStyles = {
  Camel: 'camel',
  Snake: 'snake',
  Kebab: 'kebab',
  Pascal: 'pascal'
};

function applyCasingStyle(casingStyle, modelName) {
  switch (casingStyle) {
    case CasingStyles.Camel:
      return _.camelCase(modelName);
    case CasingStyles.Kebab:
      return _.kebabCase(modelName);
    case CasingStyles.Pascal:
      return _.upperFirst(_.camelCase(modelName));
    case CasingStyles.Snake:
      return _.snakeCase(modelName);
    default:
      throw new Error(`Illegal casingStyle of '${casingStyle}' provided. Must be one of [${[
        CasingStyles.Camel,
        CasingStyles.Kebab,
        CasingStyles.Pascal,
        CasingStyles.Snake
      ]}]`);
  }
}

function getUrl(collectionName, config) {
  const apiRoot = config.apiRoot;
  const isPlural = config.pluralize;
  const casingStyle = config.casingStyle;
  let endpoint = config.endpoint;

  // if the user did not provide a custom endpoint, generate
  // one from the collection name
  if (!endpoint) {
    endpoint = isPlural ?
      applyCasingStyle(casingStyle, pluralize(collectionName)) :
      applyCasingStyle(casingStyle, collectionName);
  }

  return apiRoot ? `${apiRoot}/${endpoint}` : endpoint;
}

export default function(collectionName, options) {
  const collectionsConfig = options.collectionsConfig || {};
  const modelsConfig = options.modelsConfig || {};
  const collectionDefinition = options.collectionDefinition || {};
  const modelDefinition = options.modelDefinition || {};
  const connection = options.connection || {};

  /**
   * Create the final config object
   * 1. Start with anything in /config/collections.js
   * 2. Add anything specified in /config/models.js not already defined
   *
   * Excluding properties from /models to prevent scenarios such as a
   * model-specific parse method being used for collections.  We're really
   * just interested in whether apiRoot or pluralize has been set in /models.
   */

  const config = _.defaultsDeep(
    {},
    collectionsConfig,
    _.omit(modelsConfig, 'properties')
  );

  /**
   * SPECIAL CASE:
   * Copy the headers from the model to the collection if none provided
   */
  // const modelHeaders = modelsConfig.properties && modelsConfig.properties.headers
  // config.properties = config.properties || {};
  // if (modelsConfig.properties.headers && !config.properties.headers) {
  //   config.properties.headers = modelsConfig.properties.headers;
  // }

  /**
   * Create the final definition object
   * 1. Start with anything in /collections/collectionName.js
   * 2. Add anything specified in /models/collectionName.js not already defined
   *
   * Excluding properties from /models to prevent scenarios such as a
   * model-specific parse method being used for collections.  We're really
   * just interested in whether apiRoot or pluralize has been set in /models.
   */

  const definition = _.defaultsDeep(
    {},
    collectionDefinition,
    _.omit(modelDefinition, 'properties')
  );

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connections, collections and the individual collection definition
   */
  const combinedConfig = _.merge({}, connection, config, definition);
  const conventions = {
    properties: {
      url: getUrl(collectionName, combinedConfig)
    }
  };

  /**
   * SPECIAL CASE: Headers
   * If headers are defined in the model, use those instead of the connection
   */
  if (_.get(modelDefinition, 'properties.headers')) {
    conventions.properties.headers = _.get(modelDefinition, 'properties.headers');
  } else if (connection.headers) {
    conventions.properties.headers = connection.headers;
  }

  // Build the final set of properties for the collection
  const properties = _.defaultsDeep({},
    definition.properties,
    config.properties,
    connection.collections.properties,
    conventions.properties
  );

  return properties;
}
