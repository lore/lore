var _ = require('lodash');
var configLoader = require('../loaders/config');

function getDefaultConfig(hooks) {
  return _.reduce(hooks, function(result, value, key) {
    return _.merge(result, _.result(value, 'defaults'));
  }, {});
}

module.exports = function getConfig(configOverride, hooks) {
  var defaultConfig = getDefaultConfig(hooks);
  var userConfig = configLoader.load();
  return _.merge({}, defaultConfig, userConfig, configOverride);
};
