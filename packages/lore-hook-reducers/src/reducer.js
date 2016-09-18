var _ = require('lodash');
var sortReducersByLoadOrder = require('./sortReducersByLoadOrder');
var ActionTypes = require('lore-utils').ActionTypes;

module.exports = function compositeReducer(reducers, dependencies) {
  var loadOrder = sortReducersByLoadOrder(dependencies);

  // Create an initial state object from the reducer names
  // var initialState = {
  //   find: undefined,
  //   byId: undefined,
  //   byCid: undefined
  // };
  var initialState = _.mapValues(reducers, function() {
    return undefined;
  });

  return function (state, action) {
    state = state || initialState;
    var nextState = {};

    // If we recieve an action to reset the store (such as when logging out)
    // reset the state to the initial state
    if (action.type === ActionTypes.RESET_STORE) {
      state = initialState;
    }

    loadOrder.forEach(function(reducerName) {
      // Equivalent to calling:
      // var _find = byId(state.find, action, {
      //   nextState: {
      //     byCid: _byCid
      //     byId: _byId
      //   }
      // }
      nextState[reducerName] = reducers[reducerName](
        state[reducerName],
        action,
        { nextState: nextState }
      );
    });

    return nextState;
  };
};
