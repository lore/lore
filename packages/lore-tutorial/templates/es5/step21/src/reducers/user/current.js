var _ = require('lodash');
var ActionTypes = require('../../constants/ActionTypes');
var PayloadStates = require('../../constants/PayloadStates');

var initialState = {
  state: PayloadStates.INITIAL_STATE
};

module.exports = function(state, action) {
  state = state || initialState;
  var nextState = _.assign({}, state);

  switch (action.type) {
    case ActionTypes.FETCH_CURRENT_USER:
      return action.payload;

    default:
      return nextState
  }
};
