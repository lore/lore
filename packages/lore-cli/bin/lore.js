#!/usr/bin/env node

var _ = require('lodash');
var package = require('../package.json');
var program = require('commander');

console.log('*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*');
console.log('*                                                            _.-"\\        *');
console.log('*  ▄█        ▄██████▄     ▄████████    ▄████████         _.-"     \\       *');
console.log('*  ███       ███    ███   ███    ███   ███    ███     ,-"          \\      *');
console.log('*  ███       ███    ███   ███    ███   ███    █▀     ( \\            \\     *');
console.log('*  ███       ███    ███  ▄███▄▄▄▄██▀  ▄███▄▄▄         \\ \\            \\    *');
console.log('*  ███       ███    ███ ▀▀███▀▀▀▀▀   ▀▀███▀▀▀          \\ \\            \\   *');
console.log('*  ███       ███    ███ ▀███████████   ███    █▄        \\ \\         _.-;  *');
console.log('*  ███▌    ▄ ███    ███   ███    ███   ███    ███        \\ \\    _.-"   :  *');
console.log('*  █████▄▄██  ▀██████▀    ███    ███   ██████████         \\ \\,-"    _.-"  *');
console.log('*  ▀                      ███    ███                       \\(   _.-"      *');
console.log('*                                                           `--"          *');
console.log('*                   ~ BUILD APPS WORTHY OF LEGEND ~                       *');
console.log('*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*');
console.log('\n');

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
  .action(function() { program.emit('version') });

// $ lore new <appname>
program.command('new [project_name]')
  .usage('[project_name]')
  .action(require('./lore-new'));

// $ lore
program.parse(process.argv);
if (program.args.length === 0) {
  program.commands = _.reject(program.commands, {
    _name: '*'
  });
  program.help();
}
