#!/usr/bin/env node

var pkg = require('../package.json');
var Cli = require('nested-yargs');
var rc = require('@lore/cli-config');
var _ = require('lodash');

var config = rc({
  commands: {
    new: require('@lore/cli-new'),
    tutorial: require('@lore/cli-tutorial'),
    generate: {
      description: 'Generate common project files',
      commands: {
        generator: require('@lore/cli-generate-generator'),
        // test: {
        //   command: 'test',
        //   describe: 'Test custom command',
        //   options: {
        //     handler: function(argv) {
        //       console.log('extract action');
        //     }
        //   }
        // }
      }
    }
  }
});


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
 * Create the CLI Root
 */

var app = Cli.createApp({
  version: pkg.version
});

/**
 * Create the Commands and Categories for the CLI
 */

function createCommand(category, command, module) {
  // console.log(`Command: '${command}'`);
  category.command(commandify(module, {
    command: command
  }));
}

function createCategory(app, name, description, commands) {
  // console.log(`Category: '${name}'`);
  description = description || '';
  commands = commands || {};

  var category = Cli.createCategory(name, description);

  _.mapKeys(commands, function(module, command) {
    createCommand(category, command, module);
  });

  app.command(category);
}

_.mapKeys(config.commands, function(value, key) {
  // console.log(`Inspecting '${key}'`);

  if (!_.isPlainObject(value)) {
    if (!value) {
      return;
    }

    throw new Error('Commands must be an object');
  }

  if (value.command) {
    createCommand(app, key, value);
  } else {
    createCategory(app, key, value.description, value.commands);
  }
});

/**
 * Start up the CLI!
 */

Cli.run(app);
