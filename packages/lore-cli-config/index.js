var cosmiconfig = require('cosmiconfig');
var _ = require('lodash');

module.exports = function getConfig(defaults = {}) {
  const path = process.cwd();
  const result = cosmiconfig('lore').searchSync(path) || {};
  return _.merge(defaults, result.config || {});
};
