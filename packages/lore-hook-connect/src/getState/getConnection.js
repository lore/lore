var _ = require('lodash');
var convertDefinitionToConnection = require('./convertDefinitionToConnection');
var generateBlueprintFromConventions = require('./generateBlueprintFromConventions');

function ConnectionMappingError(stateKey) {
  var error = new Error(
    'Could not map reducer state ' + stateKey + ' to an action.\n' +
    'Does not map to conventions and did not find a definition in the reducerActionMap.'
  );
  error.name = 'ConnectionMappingError';
  return error;
}

module.exports = function getConnection(stateKey, reducerActionMap, actions, blueprints) {
  var definition = reducerActionMap[stateKey] || generateBlueprintFromConventions(stateKey);

  if (!definition) {
    throw new ConnectionMappingError(stateKey);
  }

  var connection = convertDefinitionToConnection(stateKey, definition, actions, blueprints);
  return connection;
};
