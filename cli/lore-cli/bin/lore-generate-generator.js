#!/usr/bin/env node

var nodepath = require('path');
var _ = require('lodash');

var loregen = require('lore-generate');
var loreGenerateNew = require('../../lore-generate-generator');

var package = require('lore/package.json');

module.exports = function() {
  var cliArguments = Array.prototype.slice.call(arguments[0]);
  cliArguments.pop();
  var args = cliArguments;

  return loregen({
    generator: loreGenerateNew,
    rootPath: process.cwd(),
    modules: {},
    loreRoot: nodepath.resolve(__dirname, '..'),
    lorePackageJSON: package,
    args: cliArguments
  }).then(function() {
    console.log('Generator finished successfully.')
  }).catch(function(e) {
    console.log('Generator failed with errors:')
    console.log(e)
  });
};
