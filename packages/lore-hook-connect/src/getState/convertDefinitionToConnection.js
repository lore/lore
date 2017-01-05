var _ = require('lodash');
var Connection = require('../Connection');
var MissingBlueprintError = require('../errors/MissingBlueprintError');
var InvalidBlueprintError = require('../errors/InvalidBlueprintError');
var blueprints = {
  find: require('../blueprints/find'),
  byId: require('../blueprints/byId'),
  singleton: require('../blueprints/singleton')
};

module.exports = function convertDefinitionToConnection(stateKey, definition, actions) {
  var action = definition.action;
  var blueprint = definition.blueprint;

  if (!blueprint) {
    throw MissingBlueprintError(stateKey);
  }

  if (_.isPlainObject(blueprint)) {
    return new Connection(blueprint, {
      reducer: stateKey,
      action: action,
      actions: actions
    })
  }

  var conventionBasedBlueprint = blueprints[blueprint];

  if (!conventionBasedBlueprint) {
    throw InvalidBlueprintError(blueprint, _.keys(blueprints));
  }

  return new Connection(conventionBasedBlueprint, {
    reducer: stateKey,
    action: action,
    actions: actions
  })
};
