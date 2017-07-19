import getConnection from './getConnection';

export default function(actions, blueprints, reducerActionMap) {
  return function (state, stateKey, params, options) {
    const connection = getConnection(stateKey, reducerActionMap, actions, blueprints);
    return connection.getState(state, params, options);
  };
}
