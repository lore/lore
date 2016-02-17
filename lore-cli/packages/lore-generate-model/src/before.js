var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var util = require('util');
var fs = require('fs');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    _.defaults(scope, { });

    scope.rootPath = path.resolve(process.cwd(), appName || '');
  });
};
