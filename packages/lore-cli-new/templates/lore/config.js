import { getBaseConfig, getEnvConfig, getLocalConfig } from '@lore/config';
import _ from 'lodash';

/**
 * Generate the final config from the combination of the overrides passed
 * into the app, the default config (calculated from the hooks), and the
 * user config for the project (loaded and compiled inside this function).
 * configOverride takes priority, then the user config, and finally any defaults
 * specified the hooks.
 *
 * @param {String} environment
 * @param {Object} configOverride
 */

export const getConfig = function getConfig(environment = 'development', configOverride={}) {
  const baseConfig = getBaseConfig();
  const envConfig = getEnvConfig(environment);
  const localConfig = getLocalConfig();

  return _.merge({},
    baseConfig,
    envConfig,
    localConfig,
    configOverride
  );
};
