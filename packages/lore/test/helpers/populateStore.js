var _ = require('lodash');
var Model = require('../../../lore-models').Model;
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;

/**
 *
 * @param store
 * @param modelName
 * @param data
 * @returns {*}
 */
function dispatchModel(store, modelName, data) {
  // Pass the data through Model to make sure we get a cid
  // if one was not provided. If one was provided, overwrite
  // whatever is assigned with the one provided.
  var cid = data.cid;
  delete data.cid;
  var model = new Model(data);
  model.cid = cid || model.cid;

  // Create the action - the thing we need to dispatch to
  // update the store
  var action = {
    type: ActionTypes.add(modelName),
    payload: payload(model, PayloadStates.RESOLVED)
  };

  // Dispatch the action - this will immediately update the store
  store.dispatch(action);

  // Return the payload, in case someone needs to know what was
  // dispatched
  return action.payload;
}

function populateStore(store, dataDictionary) {
  return _.mapValues(dataDictionary, function(data, modelName) {
    // Convert the data to an array so we can use a generic approach
    // to update the store
    if(!_.isArray(data)) {
      data = [data];
    }

    return data.map(function(datum) {
      return dispatchModel(store, modelName, datum);
    });
  });
}

module.exports = populateStore;
