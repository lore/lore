var ActionTypes = require('../../../utils/ActionTypes');
var _ = require('lodash');

/*
 * byId Reducer Blueprint
 */

function addOrUpdateById(nextState, payload) {
  var id = payload && payload.id;
  var existingModel = null;

  if (id) {
    existingModel = nextState[id];
    if (existingModel) {
      nextState[id] = _.assign({}, payload, {
        cid: existingModel.cid
      });
    } else {
      nextState[id] = payload;
    }
  }
  return nextState;
}

function removeById(nextState, payload) {
  var id = payload && payload.id;
  if (id) {
    delete nextState[id];
  }
  return nextState;
}

module.exports = function(modelName) {

  return function byId(state, action) {
    state = state || {};
    var nextState = _.assign({}, state);

    switch (action.type) {
      case ActionTypes.add(modelName):
        return addOrUpdateById(nextState, action.payload);

      case ActionTypes.update(modelName):
        return addOrUpdateById(nextState, action.payload);

      case ActionTypes.remove(modelName):
        return removeById(nextState, action.payload);

      case ActionTypes.fetchPlural(modelName):
        action.payload.data.forEach(function(datum) {
          addOrUpdateById(nextState, datum);
        });
        return nextState;

      default:
        return nextState
    }
  };

};
