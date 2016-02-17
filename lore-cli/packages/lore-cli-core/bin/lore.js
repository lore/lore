#!/usr/bin/env node

var _ = require('lodash');
var package = require('../package.json');
var program = require('commander');

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
function call(func) {
  return function() {
    called = true;
    func(arguments);
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

// $ lore new [app_name]
program.command('new <app_name>')
  .usage('<app_name>')
  .description('generate a new Lore project.')
  .action(call(require('./lore-new')));

// $ lore generate-generator [generator_name]
program.command('generate-generator <generator_name> [generator_description]')
  .usage('<generator_name> [generator_description]')
  .description('generate a new Lore generator.')
  .action(call(require('./lore-generate-generator')));

// $ lore
program.parse(process.argv);
if(!called) {
  program.commands = _.reject(program.commands, {
    _name: '*'
  });
  program.help();
}
