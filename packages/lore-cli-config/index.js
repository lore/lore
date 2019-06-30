var cosmiconfig = require('cosmiconfig');
var _ = require('lodash');

module.exports = function getConfig(defaults = {}) {
  const path = process.cwd();
  const result = cosmiconfig('lore').searchSync(path);

  if (!result) {
    throw new Error(`No Lore config found in: ${path}`)
  }

  return _.merge(defaults, result.config || {});
};
