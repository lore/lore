/* global __LORE_ROOT__ */

import buildDictionary from 'webpack-requiredir';
import _ from 'lodash';

// 'config/*'
function loadOtherConfigFiles() {
  const context = require.context(`${__LORE_ROOT__}/config`, true, /\.js$/);
  const config = buildDictionary(context, {
    exclude: ['local.js']
  });

  return _.omit(config, 'env');
}

// 'config/local'
function loadLocalOverrideFile() {
  const context = require.context(`${__LORE_ROOT__}/config`, false, /local.js$/);
  const dictionary = buildDictionary(context, {
    // options
  });
  return dictionary.local || {};
}

// 'config/env/*'
function loadEnvConfigFile(env) {
  const context = require.context(`${__LORE_ROOT__}/config/env`, false, /\.js$/);
  const dictionary = buildDictionary(context, {
    // options
  });
  return dictionary[env] || {};
}

export default {

  load: function(env) {
    // Load all the config files we need to combine
    const configs = {
      'config/*': loadOtherConfigFiles(),
      'config/local': loadLocalOverrideFile(),
      'config/env/*': loadEnvConfigFile(env)
    };

    // Merge the configs, with env/*.js files taking precedence over others, and local.js
    // taking precedence over everything
    return _.merge(
      configs['config/*'],
      configs['config/env/*'],
      configs['config/local']
    );
  }

};
