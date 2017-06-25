var _getState = require('lore-hook-connect/lib/getState');

module.exports = function() {
  // Hack to support a lore.getState ability
  var getState = lore.getState = _getState(
    lore.actions,
    lore.config.connect.blueprints,
    lore.config.connect.reducerActionMap
  );

  lore.getState = function(stateKey, params, options) {
    var state = lore.store.getState();
    return getState(state, stateKey, params, options)
  }
};
