var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var _ = require('lodash');

module.exports = function(modelName) {

  var initialState = {
    state: PayloadStates.INITIAL_STATE
  };

  return function authHookReducer(state, action) {
    state = state || initialState;
    var nextState = _.assign({}, state);

    switch (action.type) {
      case ActionTypes.add(modelName):
        return action.payload;

      case ActionTypes.update(modelName):
        return action.payload;

      case ActionTypes.remove(modelName):
        return action.payload;

      case ActionTypes.RESET_STORE:
        return initialState;

      default:
        return nextState
    }
  };

};
