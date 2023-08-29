export default function ConnectionMappingError(stateKey) {
  const error = new Error([
    `Could not map reducer state ${stateKey} to an action. Does not map to `,
    `conventions and did not find a definition in the reducerActionMap.`
  ].join(''));
  error.name = 'ConnectionMappingError';
  return error;
}
