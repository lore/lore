var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

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
      payloadState: PayloadStates.EXISTS
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
