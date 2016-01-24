var pluralize = require('pluralize');
var defaultsDeep = require('merge-defaults');
var _ = require('lodash');

function conventionProperties(collectionName, config) {
  var apiRoot = config.apiRoot;

  if (config.pluralize) {
    return {
      url: apiRoot ? apiRoot + '/' + pluralize(collectionName) : pluralize(collectionName)
    }
  }

  return {
    url: apiRoot ? apiRoot + '/' + collectionName : '/' + collectionName
  }
}

module.exports = function(collectionName, options) {
  var collectionsConfig = options.collectionsConfig || {};
  var modelsConfig = options.modelsConfig || {};
  var collectionDefinition = options.collectionDefinition || {};
  var modelDefinition = options.modelDefinition || {};

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
   * Build conventions from config and collection definition. The config that
   * drives conventions is built from the apiRoot and pluralize fields in:
   * 1. collections/collectionName.js
   * 2. config/collections.js
   */
  var conventionConfig = _.merge({}, config, definition);
  var conventions = {
    properties: conventionProperties(collectionName, conventionConfig)
  };

  // Build the final set of properties for the collection
  var properties = {};
  defaultsDeep(properties, definition.properties);
  defaultsDeep(properties, config.properties);
  defaultsDeep(properties, conventions.properties);

  return properties;
};
