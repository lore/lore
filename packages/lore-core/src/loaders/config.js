var buildDictionary = require('webpack-requiredir');

// 'config/*'
function loadOtherConfigFiles() {
  var context = require.context(__LORE_ROOT__ + '/config', false, /\.js$/);
  return buildDictionary(context, {
    exclude: ['local.js']
  });
}

// 'config/local'
function loadLocalOverrideFile() {
  var context = require.context(__LORE_ROOT__ + '/config', false, /\local.js$/);
  return buildDictionary(context, {
    // options
  });
}

// 'config/env/*'
function loadEnvConfigFile(env) {
  var context = require.context(__LORE_ROOT__ + '/config/env', false, /\.js$/);
  var dictionary = buildDictionary(context, {
    // options
  });
  return dictionary[env] || {};
}

module.exports = {

  load: function(env) {
    // Load all the config files we need to combine
    var configs = {
      'config/*': loadOtherConfigFiles(),
      'config/local' : loadLocalOverrideFile(),
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
