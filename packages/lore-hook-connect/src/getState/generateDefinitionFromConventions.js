var _ = require('lodash');

module.exports = function generateDefinitionFromConventions(stateKey, reducerActionMap) {
  var tokens = stateKey.split('.');
  var modelName = tokens[0];
  var reducer = tokens[1];

  var map = _.transform(reducerActionMap, function(result, value, key) {
    var newKey = key.replace('*', modelName);
    result[newKey] = {
      action: value.action ? value.action.replace('*', modelName) : null,
      reducer: value.reducer ? value.reducer.replace('*', modelName) : null,
      blueprint: value.blueprint ? value.blueprint.replace('*', modelName) : null,
    }
  }, {});

  return map[stateKey];
};
