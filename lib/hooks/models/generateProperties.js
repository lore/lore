var pluralize = require('pluralize');
var defaultsDeep = require('merge-defaults');
var _ = require('lodash');

function conventionProperties(modelName, config) {
  var apiRoot = config.apiRoot;

  if (config.pluralize) {
    return {
      urlRoot: apiRoot ? apiRoot + '/' + pluralize(modelName) : pluralize(modelName)
    };
  }

  return {
    urlRoot: apiRoot ? apiRoot + '/' + modelName : '/' + modelName
  };
}

module.exports = function (modelName, options) {
  var config = options.config || {};
  var definition = options.definition || {};

  /**
   * Build conventions from config and collection definition. The config that
   * drives conventions is built from the apiRoot and pluralize fields in:
   * 1. collections/collectionName.js
   * 2. config/collections.js
   */
  var conventionConfig = _.merge({}, config, definition);
  var conventions = {
    properties: conventionProperties(modelName, conventionConfig)
  };

  // Build the final set of properties for the collection
  var properties = {};
  defaultsDeep(properties, definition.properties);
  defaultsDeep(properties, config.properties);
  defaultsDeep(properties, conventions.properties);

  return properties;
};