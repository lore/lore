import convertDefinitionToConnection from './convertDefinitionToConnection';
import generateDefinitionFromConventions from './generateDefinitionFromConventions';

function ConnectionMappingError(stateKey) {
  const error = new Error(
    `Could not map reducer state ${stateKey} to an action.
    Does not map to conventions and did not find a definition in the reducerActionMap.`
  );
  error.name = 'ConnectionMappingError';
  return error;
}

export default function getConnection(stateKey, reducerActionMap, actions, blueprints) {
  const definition = (
    reducerActionMap[stateKey] ||
    generateDefinitionFromConventions(stateKey, reducerActionMap)
  );

  if (!definition) {
    throw new ConnectionMappingError(stateKey);
  }

  const connection = convertDefinitionToConnection(stateKey, definition, actions, blueprints);
  return connection;
}
