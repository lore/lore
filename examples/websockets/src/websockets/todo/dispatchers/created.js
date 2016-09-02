var ActionTypes = require('../../../constants/ActionTypes');
var PayloadStates = require('../../../constants/PayloadStates');
var payload = require('lore-actions').utils.payload;

module.exports = function(store){
  return function (message) {
    var Model = lore.models.todo;
    var model = new Model(message.data);

    // todo: replace this with a more configurable solution
    if(model.get('cid')) {
      model.cid = model.get('cid');
    }

    store.dispatch({
      type: ActionTypes.ADD_TODO,
      payload: payload(model, PayloadStates.RESOLVED)
    });
  }
};
