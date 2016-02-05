var ActionTypes = require('../../../utils/ActionTypes');
var _ = require('lodash');

/*
 * byCid Reducer Blueprint
 */

function addOrUpdateByCid(nextState, payload) {
  var cid = payload && payload.cid;
  var cidWithDuplicatedId = null;

  if (cid) {
    if (payload.id) {
      cidWithDuplicatedId = _.findKey(nextState, { id: payload.id });

      // if we find a cid with a matching id, update that model with
      // the latest data, but keep the original cid
      if (cidWithDuplicatedId) {
        nextState[cidWithDuplicatedId] = _.assign({}, payload, {
          cid: cidWithDuplicatedId
        });
      } else {
        nextState[cid] = payload;
      }
    } else {
      nextState[cid] = payload;
    }
  }

  return nextState;
}

function removeByCid(nextState, payload) {
  var cid = payload && payload.cid;
  if (cid) {
    delete nextState[cid];
  }
  return nextState;
}

module.exports = function (modelName) {

  return function byCid(state, action) {
    state = state || {};
    var nextState = _.assign({}, state);

    switch (action.type) {
      case ActionTypes.add(modelName):
        return addOrUpdateByCid(nextState, action.payload);

      case ActionTypes.update(modelName):
        return addOrUpdateByCid(nextState, action.payload);

      case ActionTypes.remove(modelName):
        return removeByCid(nextState, action.payload);

      case ActionTypes.fetchPlural(modelName):
        action.payload.data.forEach(function (datum) {
          addOrUpdateByCid(nextState, datum);
        });
        return nextState;

      default:
        return nextState;
    }
  };
};