#!/usr/bin/env node

var package = require('../package.json');
var Cli = require('nested-yargs');
var rc = require('rc');
var path = require('path');
var _ = require('lodash');

function local(module) {
  return path.resolve(__dirname, '../node_modules', module);
}

var lorerc = rc('lore', {
  options: {
    debugLoading: false
  },
  generators: {
    language: "es5"
  },
  commands: {
    new: local("lore-generate-new"),
    tutorial: local("lore-tutorial"),
    extract: {
      description: "Create files that mirror the blueprint behavior",
      commands: {
        action: local("lore-extract-action"),
        reducer: local("lore-extract-reducer")
      }
    },
    generate: {
      description: "Generate common project files",
      commands: {
        collection: local("lore-generate-collection"),
        component: local("lore-generate-component"),
        generator: local("lore-generate-generator"),
        model: local("lore-generate-model"),
        reducer: local("lore-generate-reducer"),
        surge: local("lore-generate-surge"),
        github: local("lore-generate-github"),
        tutorial: local("lore-generate-tutorial")
      }
    }
  }
});

function log(message) {
  if (lorerc.options.debugLoading) {
    console.log(message);
  }
}

function loadProjectModule(scope, module) {
  var modulePath = path.resolve(scope.projectPath, 'node_modules', module);
  return require(modulePath)
}

function loadGlobalModule(scope, module) {
  return require(module);
}

function loadProjectRelativeModule(scope, module) {
  var modulePath = path.resolve(scope.projectPath, module);
  return require(modulePath);
}

function loadModule(scope, modulePath) {
  var isAbsolute = path.isAbsolute(modulePath);
  var isDirectory = !!path.parse(modulePath).dir;

  if (isAbsolute) {
    log('Loading absolute module: ' + modulePath);
    return require(modulePath);
  }

  if (isDirectory) {
    log('Loading directory module: ' + modulePath);
    return loadProjectRelativeModule(scope, modulePath);
  }

  try {
    log('Loading project module: ' + modulePath);
    return loadProjectModule(scope, modulePath);
  } catch(err) {
    log('Loading global module: ' + modulePath);
    return loadGlobalModule(scope, modulePath);
  }
}

// If you get the error "v8debug is not defined" while debugging,
// see this issue for more information:
// https://youtrack.jetbrains.com/issue/WEB-21717

/**
 * Convert 'lore-generator-*' modules to 'nested-args' a command
 * @param module
 */
function commandify(module, overrides) {
  overrides = overrides || {};
  var name = overrides.command || module.command;
  var description = module.describe;
  var options = module.options;

  // expose --force on all commands
  options.options = options.options || {};
  options.options.force = {
    description: 'Overwrite existing files',
      type: 'boolean',
      default: false
  };

  // expose --logLevel on all commands
  options.options.logLevel = {
    description: 'Desired level of logging output',
    type: 'string',
    choices: [
      'trace',
      'debug',
      'log',
      'info',
      'warn',
      'error'
    ],
    default: 'info'
  };

  return Cli.createCommand(name, description, options);
}

/**
 * Setup any variables the module loaders will need
 */

var getScope = function() {
  return {
    projectPath: path.parse(lorerc.config || '').dir
  }
};

/**
 * Create the CLI Root
 */
var app = Cli.createApp({
  version: package.version
});

/**
 * Create the Commands and Categories for the CLI
 */

function createCommand(category, command, modulePath) {
  var scope = getScope();
  var module = loadModule(scope, modulePath);
  category.command(commandify(module, {
    command: command
  }));
}

function createCategory(app, name, description, commands) {
  description = description || '';
  commands = commands || {};

  var category = Cli.createCategory(name, description);

  _.mapKeys(commands, function(modulePath, command) {
    createCommand(category, command, modulePath);
  });

  app.command(category);
}

_.mapKeys(lorerc.commands, function(value, key) {
  if (_.isString(value)) {
    createCommand(app, key, value);
  } else if (_.isPlainObject(value)) {
    createCategory(app, key, value.description, value.commands);
  } else {
    throw new Error('Commands must be either a string or an object');
  }
});

/**
 * Start up the CLI!
 */
Cli.run(app);
