var requireDir = require('require-dir');
var _ = require('lodash');
var envConfigs = requireDir('./webpack/env');

var settings = {
  APP_ROOT: __dirname
};

// build the base webpack config
var config = require('./webpack/config')(settings);

// get the environment specific config
var env = process.env.NODE_ENV || 'development';
var envConfig = envConfigs[env];

// if there is a config for this environment, override the base
// config with whatever is specified there
if(envConfig) {
  _.assign(config, envConfig(settings));
}

// export the final config file
module.exports = config;
