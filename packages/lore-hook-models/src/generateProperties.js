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

function getUrlRoot(modelName, config) {
  const apiRoot = config.apiRoot;
  const isPlural = config.pluralize;
  const casingStyle = config.casingStyle;
  let endpoint = config.endpoint;

  // if the user did not provide a custom endpoint, generate
  // one from the model name
  if (!endpoint) {
    endpoint = isPlural ?
      applyCasingStyle(casingStyle, pluralize(modelName)) :
      applyCasingStyle(casingStyle, modelName);
  }

  return apiRoot ? `${apiRoot}/${endpoint}` : endpoint;
}

export default function(modelName, options) {
  const connection = options.connection || {};
  const config = options.config || {};
  const definition = options.definition || {};

  /**
   * Merge apiRoot, pluralize and casingStyle from config files for
   * connections, models and the individual model definition
   */
  const combinedConfig = _.merge({}, connection, config, definition);
  const conventions = {
    properties: {
      urlRoot: getUrlRoot(modelName, combinedConfig)
    }
  };

  if (connection.headers) {
    conventions.properties.headers = connection.headers;
  }

  // Build the final set of properties for the collection
  const properties = _.defaultsDeep(
    {},
    definition.properties,
    config.properties,
    connection.models.properties,
    conventions.properties
  );

  return properties;
}
