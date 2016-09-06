var ActionTypes = require('../../utils/ActionTypes');
var PayloadStates = require('../../utils/PayloadStates');
var payload = require('../../utils/payload');

module.exports = function(modelName, Model) {
  return function (store) {
    return function (message) {
      var model = new Model(message.data);

      // todo: replace this with a more configurable solution
      if (model.get('cid')) {
        model.cid = model.get('cid');
      }

      store.dispatch({
        type: ActionTypes.add(modelName),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }
  }
};
