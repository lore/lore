var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var util = require('util');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    var generatorName = scope.args[0];
    var generatorDescription = scope.args[1] || '<!-- generator description goes here -->';

    var author = 'Storcery';
    var year = (new Date()).getFullYear();
    var username = scope.author;

    if (!generatorName) {
      throw new Error('Missing generator name.');
    }

    _.defaults(scope, {
      author: author,
      year: year,
      generatorName: generatorName,
      generatorDescription: generatorDescription,
      github: { username: username },
      website: util.format('http://github.com/%s', username)
    });

    // Make changes to the rootPath where the lore project will be created
    scope.rootPath = path.resolve(process.cwd(), generatorName || '');

    if(fs.existsSync(scope.rootPath)) {
      var files = fs.readdirSync(scope.rootPath);
      if (files.length > 0) {
        throw new Error('Couldn\'t create a new Lore generator in "' + scope.rootPath + '" (directory already exists and is not empty)');
      }
    }
  });
};
