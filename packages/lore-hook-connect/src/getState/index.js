var getConnection = require('./getConnection');

module.exports = function(lore) {
  return function (state, stateKey, params, options) {
    var reducerActionMap = lore.config.connect.reducerActionMap;
    var actions = lore.actions;
    var connection = getConnection(stateKey, reducerActionMap, actions);
    return connection.getState(state, params, options);
  };
};
