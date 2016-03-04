var Promise = require('bluebird');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    _.defaults(scope, { });

    scope.rootPath = path.resolve(process.cwd());

    if(fs.existsSync(scope.rootPath)) {
      var files = fs.readdirSync(scope.rootPath);
      if (files.indexOf('.lorerc') === -1) {
        throw new Error('Couldn\'t run ' + scope.generator.name + ' in "' + scope.rootPath + '" (directory doesn\'t appear to be a lore project)');
      }
    }
  });
};
