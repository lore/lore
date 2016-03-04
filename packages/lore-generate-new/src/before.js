var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var util = require('util');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    var appName = scope.args[0];
    var author = process.env.USER || 'anonymous node/lore user';

    if (!appName) {
      throw new Error('Missing project name.');
    }

    _.defaults(scope, {
      author: author,
      appName: appName,
    });

    // Make changes to the rootPath where the lore project will be created
    scope.rootPath = path.resolve(process.cwd(), appName || '');

    if(fs.existsSync(scope.rootPath)) {
      var files = fs.readdirSync(scope.rootPath);
      if (files.length > 0) {
        throw new Error('Couldn\'t create a new Lore app in "'+scope.rootPath+'" (directory already exists and is not empty)');
      }
    }
  });
};
