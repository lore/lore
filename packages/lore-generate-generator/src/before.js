var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var util = require('util');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    var generatorName = scope.args[0];

    if (!generatorName) {
      throw new Error('Missing generator name.');
    }

    _.defaults(scope, {
      generatorName: generatorName,
      generatorDescription: 'Generator for the Lore CLI',
      github: {
        username: scope.author
      },
      website: util.format('http://github.com/%s', username)
    });

    // Make changes to the rootPath where the generator will be created
    scope.rootPath = path.resolve(process.cwd(), generatorName || '');

    // Only create the generator if the directory is empty
    if(fs.existsSync(scope.rootPath)) {
      var files = fs.readdirSync(scope.rootPath);
      if (files.length > 0) {
        throw new Error('Couldn\'t create a generator in "' + scope.rootPath + '" (directory already exists and is not empty)');
      }
    }
  });
};
