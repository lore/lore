var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');

module.exports = function(modelName, models) {

  var Model = models[modelName];

  return {
    blueprint: 'create',

    model: Model,

    optimistic: {
      actionType: ActionTypes.add(modelName),
      payloadState: PayloadStates.CREATING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.remove(modelName),
      payloadState: PayloadStates.ERROR_CREATING,
      beforeDispatch: function(response, args){
        // no op
      }
    }
  };
};
