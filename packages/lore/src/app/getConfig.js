var _ = require('lodash');
var configLoader = require('../loaders/config');

function getDefaultConfig(hooks) {
  return _.reduce(hooks, function(result, value, key) {
    return _.merge(result, _.result(value, 'defaults'));
  }, {});
}

/**
 * Generate the final config from the combination of the overrides passed
 * into the app, the default config (calculated from the hooks), and the
 * user config for the project (loaded and compiled inside this function).
 * configOverride takes priority, then the user config, and finally any defaults
 * specified the hooks.
 *
 * @param {Object} configOverride passed into lore.build(configOverride)
 *
 * @param {Object} hooks Set of hooks that should be loaded
 *
 * @returns {Object} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

module.exports = function getConfig(configOverride, hooks) {
  var defaultConfig = getDefaultConfig(hooks);
  var userConfig = configLoader.load();
  return _.merge({}, defaultConfig, userConfig, configOverride);
};
