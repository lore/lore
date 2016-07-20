/**
 * This file builds and exports the final webpack config using the default
 * configuration in `/webpack/config.js` plus any environment specific
 * overrides that should be applied on top of it.
 *
 * This file also needs to specify the application root and pass it to the
 * webpack configs in `/webpack`, so `/webpack/config.js` can define the
 * `__LORE_ROOT__` constant (which the Lore framework uses to build file paths
 * to project folders like /models, /actions, /reducers, etc.
 *
 * Because webpack bundles the project into a single file under
 * `/dist/bundle.js`, it needs to know at *build* time what files it needs to
 * include.  So while dynamic require statements will work in a Node app
 * (because `require()` is a synchronous operation, that approach won't work
 * with Webpack. All file paths need to be explicit during build time.  The
 * alternative was to use relative paths to back out of the `lore` package in
 * `node_modules` and into the project itself, but that seemed like a worse
 * and somewhat fragile alternative.
 **/

var requireDir = require('require-dir');
var _ = require('lodash');
var yargs = require('yargs');

var envConfigs = requireDir('./webpack/env');

var settings = {
  APP_ROOT: __dirname,
  PORT: yargs.argv.port || 3000
};

// build the base webpack config
var config = require('./webpack/config')(settings);

// get the environment specific config
var env = process.env.NODE_ENV || 'development';
var envConfig = envConfigs[env];

// if there is a config for this environment, override the base
// config with whatever is specified there
if (envConfig) {
  _.assign(config, envConfig(settings));
}

// export the final config file
module.exports = config;
