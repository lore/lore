import _ from 'lodash';

/**
 * Generate the final config from the combination of overrides provided.
 *
 * @param {Object} configs
 * @param {Object} configOverride
 */

export function getConfig(configs={}, configOverride={}) {
  const {
    baseConfig,
    envConfig,
    localConfig
  } = configs;

  /**
   * Generate the final config using the following rules:
   *
   * 1. Start with base project config
   * 2. Override with any environment specific settings
   * 3. Override with any settings provided via the local user config
   * 4. Override with any settings provided via the override
   */

  return _.merge({},
    baseConfig,
    envConfig,
    localConfig,
    configOverride
  );
}
