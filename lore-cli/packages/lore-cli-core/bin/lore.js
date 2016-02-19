#!/usr/bin/env node

var argv = process.argv;

var _ = require('lodash');
var package = require('../package.json');
var program = require('commander');
var nodepath = require('path');
var loregen = require('../../lore-generate');

console.log('                                 _       ___   ____     ___    ');
console.log('                                | |     /   \\ |    \\   /  _] ');
console.log('                                | |    |     ||  D  ) /  [_    ');
console.log('                                | |    |  O  ||    / |    _]   ');
console.log('                                | |___ |     ||    \\ |   [_   ');
console.log('                                |     ||     ||  .  \\|     |  ');
console.log('                                |_____| \\___/ |__|\\_||_____| ');
console.log('                                                               ');
console.log('                               ~ BUILD APPS WORTHY OF LEGEND ~ ');
console.log('                               -------------------------------');
console.log('\n');

var called = false;
function call(generator) {
  return function() {
    called = true;

    // commander lowercases arguments, for some reason.  this reverts that.
    for(i = 0; i < arguments.length; i++) { arguments[i] = argv[i + 3]; }

    (function (/* arguments */) {
      var cliArguments = Array.prototype.slice.call(arguments[0]);
      cliArguments.pop();
      var args = cliArguments;

      return loregen({
        generator: generator,
        rootPath: process.cwd(),
        modules: {},
        loreRoot: nodepath.resolve(__dirname, '..'),
        args: cliArguments
      }).then(function() {
        console.log('Generator finished successfully.')
      }).catch(function(e) {
        console.log('Generator failed with errors:')
        console.log(e)
      });
    })(arguments);
  }
}

program
  .version(package.version, '-v, --version');

// make all options case-insensitive
process.argv = _.map(process.argv, function(arg) {
  return arg.toLowerCase()
});

// $ lore version (--version synonym)
program
  .command('version')
  .description('version of the CLI')
  .action(call(function() { program.emit('version') }));

program.command('new <app_name>')
  .usage('<app_name>')
  .description('generate a new Lore project.')
  .action(call(require('../../lore-generate-new')));

program.command('generate-generator <generator_name> [generator_description]')
  .usage('<generator_name> [generator_description]')
  .description('generate a new Lore generator.')
  .action(call(require('../../lore-generate-generator')));

program.command('generate-model <model_name>')
  .usage('<model_name>')
  .description('generate a new Lore model.')
  .action(call(require('../../lore-generate-model')));

program.command('generate-collection <collection_name>')
  .usage('<collection_name>')
  .description('generate a new Lore collection.')
  .action(call(require('../../lore-generate-collection')));

program.command('generate-component <component_name>')
  .usage('<component_name>')
  .description('generate a new Lore component.')
  .action(call(require('../../lore-generate-component')));

program.command('generate-reducer <reducer_name>')
  .usage('<reducer_name>')
  .description('generate a new Lore reducer.')
  .action(call(require('../../lore-generate-reducer')));

// $ lore
program.parse(process.argv);
if(!called) {
  program.commands = _.reject(program.commands, {
    _name: '*'
  });
  program.help();
}
