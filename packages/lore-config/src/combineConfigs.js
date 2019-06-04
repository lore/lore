import _ from 'lodash';

/**
 * Generate the final config from the combination of the overrides passed
 * into the app, the default config (calculated from the hooks), and the
 * user config for the project (loaded and compiled inside this function).
 * configOverride takes priority, then the user config, and finally any defaults
 * specified the hooks.
 *
 * @param {Object} baseConfig
 * @param {Object} envConfig
 * @param {Object} localConfig
 * @param {Object} configOverride
 *
 * @returns {Object} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

export const combineConfigs = function getConfig(baseConfig={}, envConfig={}, localConfig={}, configOverride={}) {
  return _.merge({}, baseConfig, envConfig, localConfig, configOverride);
};
