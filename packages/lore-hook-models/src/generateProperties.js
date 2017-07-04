var pluralize = require('pluralize');
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

function getUrlRoot(modelName, config) {
  var apiRoot = config.apiRoot;
  var isPlural = config.pluralize;
  var casingStyle = config.casingStyle;
  var endpoint = config.endpoint;

  // if the user did not provide a custom endpoint, generate
  // one from the model name
  if (!endpoint) {
    endpoint = isPlural ?
      applyCasingStyle(casingStyle, pluralize(modelName)) :
      applyCasingStyle(casingStyle, modelName);
  }

  return apiRoot ? apiRoot + '/' + endpoint : endpoint;
}

module.exports = function(modelName, options) {
  var connection = options.connection || {};
  var config = options.config || {};
  var definition = options.definition || {};

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connections, models and the individual model definition
   */
  var combinedConfig = _.merge({}, connection, config, definition);
  var conventions = {
    properties: {
      urlRoot: getUrlRoot(modelName, combinedConfig)
    }
  };

  if (connection.headers) {
    conventions.properties.headers = connection.headers;
  }

  // Build the final set of properties for the collection
  var properties = _.defaultsDeep(
    {},
    definition.properties,
    config.properties,
    connection.models.properties,
    conventions.properties
  );

  return properties;
};
