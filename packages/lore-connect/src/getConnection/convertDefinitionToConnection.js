import _ from 'lodash';
import Connection from '../Connection';
import MissingBlueprintError from '../errors/MissingBlueprintError';
import InvalidBlueprintError from '../errors/InvalidBlueprintError';

export default function convertDefinitionToConnection(stateKey, definition, actions, blueprints) {
  const action = definition.action;
  const reducer = definition.reducer || stateKey;
  const blueprint = definition.blueprint;

  if (!blueprint) {
    throw MissingBlueprintError(stateKey);
  }

  if (_.isPlainObject(blueprint)) {
    return new Connection(blueprint, {
      reducer: reducer,
      action: action,
      actions: actions
    });
  }

  const conventionBasedBlueprint = blueprints[blueprint];

  if (!conventionBasedBlueprint) {
    throw InvalidBlueprintError(blueprint, _.keys(blueprints));
  }

  return new Connection(conventionBasedBlueprint, {
    reducer: reducer,
    action: action,
    actions: actions
  });
}
