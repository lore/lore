var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var byId = require('./byId');
var byCid = require('./byCid');
var find = require('./find');

var initialState = {
  byId: undefined,
  byCid: undefined,
  find: undefined
};

module.exports = function (state, action) {
  state = state || initialState;

  // If we receive an action to reset the store (such as when logging out)
  // reset the state to the initial state
  if (action.type === ActionTypes.RESET_STORE) {
    state = initialState;
  }

  var _byId = byId(state.byId, action);
  var _byCid = byCid(state.byCid, action);
  var _find = find(state.find, action, {
    nextState: {
      byCid: _byCid,
      byId: _byId
    }
  });

  return {
    byId: _byId,
    byCid: _byCid,
    find: _find
  };
};
