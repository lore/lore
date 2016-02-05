var _ = require('lodash');
var coreHooksLoader = require('../loaders/coreHooks');
var userHooksLoader = require('../loaders/userHooks');
var Hook = require('../Hook');

module.exports = function getHooks() {
  // Obtain and merge the core hooks and user hooks
  // If a user hook exists with the same name as a core hook
  // the user hook takes priority
  var coreHookDefinitions = coreHooksLoader.load();
  var userHookDefinitions = userHooksLoader.load();
  var hookDefinitions = _.assign({}, coreHookDefinitions, userHookDefinitions);
  var hooks = _.mapValues(hookDefinitions, function (definition, hookName) {
    definition.id = hookName;
    return new Hook(definition);
  });
  return hooks;
};