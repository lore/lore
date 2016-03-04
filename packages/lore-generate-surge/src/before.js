var Promise = require('bluebird');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    var appName = scope.appName;
    _.defaults(scope, {});
    scope.rootPath = path.resolve(process.cwd(), appName || '');
  });
};
