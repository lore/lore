var getConnection = require('./getConnection');

module.exports = function(actions, blueprints, reducerActionMap) {
  return function (state, stateKey, params, options) {
    var connection = getConnection(stateKey, reducerActionMap, actions, blueprints);
    return connection.getState(state, params, options);
  };
};
