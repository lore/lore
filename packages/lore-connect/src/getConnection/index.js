import convertDefinitionToConnection from './convertDefinitionToConnection';
import generateDefinitionFromConventions from './generateDefinitionFromConventions';
import ConnectionMappingError from '../errors/ConnectionMappingError';

export default function getConnection(stateKey, reducerActionMap, actions, blueprints) {
  const definition = (
    reducerActionMap[stateKey] ||
    generateDefinitionFromConventions(stateKey, reducerActionMap)
  );

  if (!definition) {
    throw new ConnectionMappingError(stateKey);
  }

  return convertDefinitionToConnection(stateKey, definition, actions, blueprints);
}
