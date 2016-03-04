var _ = require('lodash');
var loader = require('../loader');
var getVersionAndDependencyInfo = require('./getVersionAndDependencyInfo');
var getLogger = require('./getLogger');
var mount = require('./mount');
var getEnvironment = require('./getEnvironment');
var getHooks = require('./getHooks');
var getInitializers = require('./getInitializers');
var sortHooksByLoadOrder = require('./sortHooksByLoadOrder');
var getConfig = require('./getConfig');

/**
 * The Lore class constructor. Exposes the following fields for use:
 *
 * lore.version
 * lore.majorVersion
 * lore.minorVersion
 * lore.patchVersion
 * lore.dependencies
 * lore.config
 * lore.loader
 * lore.log
 * lore.hooks
 *
 */
var Lore = function() {
  this.log = getLogger();

  var versionInfo = getVersionAndDependencyInfo();
  this.version = versionInfo.version;
  this.majorVersion = versionInfo.majorVersion;
  this.minorVersion = versionInfo.minorVersion;
  this.patchVersion = versionInfo.patchVersion;
  this.dependencies = versionInfo.dependencies;

  this.utils = {};
};

_.extend(Lore.prototype, {

  build: function(configOverride) {
    configOverride = configOverride || {};

    // Set the environment first, in case any parts of the build process
    // change their behavior based on the environment
    this.environment = getEnvironment({
      environment: configOverride.environment
    });

    // The loader needs to be setup before the hooks as they will need to use
    // it to set up the project files
    this.loader = loader(this.environment);

    // Next we need to load the hooks before the config, as the hooks contain
    // the defaults we need to build the final configuration for the app
    this.hooks = getHooks();

    // Generate the final config from the combination of the overrides passed
    // into the app, the default config (calculated from the hooks), and the
    // user config for the project (loaded and compiled inside this function)
    this.config = getConfig(configOverride, this.hooks);

    // Get initializers and run them
    this.initializers = getInitializers();
    if (this.initializers.length > 0) {
      this.initializers.forEach(function(initializer) {
        initializer();
      });
    }

    // Now that we have the final, we can load the hooks, as their behavior is
    // dependant on the final configuration for the application
    sortHooksByLoadOrder(this.hooks, this.log).forEach(function(hook) {
      this.log.silly('Loading hook: ' + hook.id);
      hook.load(this);
      this.log.verbose(hook.id, 'hook loaded successfully.');
    }.bind(this));

    this.log.verbose('All hooks were loaded successfully.');
  },

  summon: function(configOverride) {
    this.build(configOverride);
    this.log.verbose('Mounting app...');

    var store = this.store;
    var routes = this.loader.loadRoutes();
    var history = this.config.router.history;

    mount(store, routes, history, function() {
      this.log.info('App summoned from lore!');
      this.isSummoned = true;
    }.bind(this));
  }

});

module.exports = Lore;
