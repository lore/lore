var _ = require('lodash');
var Promise = require('bluebird');

var generate = require('./generate');

var helpers = {
  folder: require('./helpers/folder'),
  template: require('./helpers/template'),
  jsonfile: require('./helpers/jsonfile'),
  copy: require('./helpers/copy'),
  file: require('./helpers/file')
};

module.exports = function (options) {
  var scope = options.scope;
  var target = options.target;
  var parentGenerator = options.parent;
  var log = options.log;

  return Promise.each(Object.keys(target), function (targetName) {
    scope.templatesDirectory = parentGenerator.templatesDirectory;

    var helper = helpers[targetName];

    if (helper !== void 0) {
      var subTarget = target[targetName];
      if (typeof target[targetName] === 'string') {
        subTarget = {
          templatePath: target[targetName]
        }
      } else if (typeof target[targetName] === 'function') {
        subTarget = {
          data: target[targetName](scope)
        }
      }

      scope = _.merge(scope, _.isObject(subTarget) ? subTarget : {});

      return helper(scope).then(function () {
        console.log("|-> Generated file: " + scope.keyPath);
      });
    }
  }).catch(function (err) {
    console.error(err);
  });
};
