var pluralize = require('pluralize');
var defaultsDeep = require('lore-utils').defaultsDeep;
var _ = require('lodash');

var CasingStyles = {
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
  var apiRoot = config.apiRoot;
  var isPlural = config.pluralize;
  var casingStyle = config.casingStyle;
  var endpoint = config.endpoint;

  // if the user did not provide a custom endpoint, generate
  // one from the collection name
  if (!endpoint) {
    endpoint = isPlural ?
      applyCasingStyle(casingStyle, pluralize(collectionName)) :
      applyCasingStyle(casingStyle, collectionName);
  }

  return apiRoot ? apiRoot + '/' + endpoint : endpoint;
}

module.exports = function(collectionName, options) {
  var collectionsConfig = options.collectionsConfig || {};
  var modelsConfig = options.modelsConfig || {};
  var collectionDefinition = options.collectionDefinition || {};
  var modelDefinition = options.modelDefinition || {};
  var connection = options.connection || {};

  /**
   * Create the final config object
   * 1. Start with anything in /config/collections.js
   * 2. Add anything specified in /config/models.js not already defined
   *
   * Excluding properties from /models to prevent scenarios such as a
   * model-specific parse method being used for collections.  We're really
   * just interested in whether apiRoot or pluralize has been set in /models.
   */

  var config = {};
  defaultsDeep(config, collectionsConfig);
  defaultsDeep(config, _.omit(modelsConfig, 'properties'));

  /**
   * SPECIAL CASE:
   * Copy the headers from the model to the collection if none provided
   */
  // var modelHeaders = modelsConfig.properties && modelsConfig.properties.headers
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

  var definition = {};
  defaultsDeep(definition, collectionDefinition);
  defaultsDeep(definition, _.omit(modelDefinition, 'properties'));

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connections, collections and the individual collection definition
   */
  var combinedConfig = _.merge({}, connection, config, definition);
  var conventions = {
    properties: {
      url: getUrl(collectionName, combinedConfig)
    }
  };

  /**
   * SPECIAL CASE: Headers
   * If headers are defined in the model, use those instead of the connection
   */
  if (_.get(modelDefinition, 'properties.headers')) {
    conventions.properties.headers = _.get(modelDefinition, 'properties.headers')
  } else if (connection.headers) {
    conventions.properties.headers = connection.headers;
  }

  // Build the final set of properties for the collection
  var properties = {};
  defaultsDeep(properties, definition.properties);
  defaultsDeep(properties, config.properties);
  defaultsDeep(properties, connection.collections.properties);
  defaultsDeep(properties, conventions.properties);

  return properties;
};
