var _ = require('lodash');
var Connection = require('../Connection');
var MissingBlueprintError = require('../errors/MissingBlueprintError');
var InvalidBlueprintError = require('../errors/InvalidBlueprintError');

module.exports = function convertDefinitionToConnection(stateKey, definition, actions, blueprints) {
  var action = definition.action;
  var reducer = definition.reducer || stateKey;
  var blueprint = definition.blueprint;

  if (!blueprint) {
    throw MissingBlueprintError(stateKey);
  }

  if (_.isPlainObject(blueprint)) {
    return new Connection(blueprint, {
      reducer: reducer,
      action: action,
      actions: actions
    })
  }

  var conventionBasedBlueprint = blueprints[blueprint];

  if (!conventionBasedBlueprint) {
    throw InvalidBlueprintError(blueprint, _.keys(blueprints));
  }

  return new Connection(conventionBasedBlueprint, {
    reducer: reducer,
    action: action,
    actions: actions
  })
};
