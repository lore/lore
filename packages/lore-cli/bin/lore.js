#!/usr/bin/env node

var package = require('../package.json');
var Cli = require('nested-yargs');

// If you get the error "v8debug is not defined" while debugging,
// see this issue for more information:
// https://youtrack.jetbrains.com/issue/WEB-21717

/**
 * Convert 'lore-generator-*' modules to 'nested-args' a command
 * @param module
 */
function commandify(module) {
  var name = module.command;
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
  version: package.version
});

/**
 * Command: New
 */
app.command(commandify(require('lore-generate-new')));

/**
 * Category: Generators
 */
var generators = Cli.createCategory('generate', 'Generate common project files');

generators.command(commandify(require('lore-generate-collection')));
generators.command(commandify(require('lore-generate-component')));
generators.command(commandify(require('lore-generate-generator')));
generators.command(commandify(require('lore-generate-model')));
generators.command(commandify(require('lore-generate-reducer')));
generators.command(commandify(require('lore-generate-surge')));
generators.command(commandify(require('lore-generate-github')));
generators.command(commandify(require('lore-generate-tutorial')));

app.command(generators);

/**
 * Category: Extractors
 */
var extractors = Cli.createCategory('extract', 'Create files that mirror the blueprint behavior');

extractors.command(commandify(require('lore-extract-action')));
extractors.command(commandify(require('lore-extract-reducer')));

app.command(extractors);

/**
 * Start up the CLI!
 */
Cli.run(app);
