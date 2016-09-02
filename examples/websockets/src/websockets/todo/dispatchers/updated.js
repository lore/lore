var ActionTypes = require('../../../constants/ActionTypes');
var PayloadStates = require('../../../constants/PayloadStates');
var payload = require('lore-actions').utils.payload;

function getCid(model, store) {
  // if the model exists in the store, set the cid to match
  // what is on this client, to make sure it gets removed
  // from byCid as well, which will make sure it gets removed
  // from the find reducer.
  var storeModel = store.getState().todo.byId[model.id];
  return storeModel ? storeModel.cid : model.cid;
}

module.exports = function(store){
  return function(message) {
    var Model = lore.models.todo;

    var model = new Model(message.data);
    model.cid = getCid(model, store);

    store.dispatch({
      type: ActionTypes.UPDATE_TODO,
      payload: payload(model, PayloadStates.RESOLVED)
    });
  }
};
