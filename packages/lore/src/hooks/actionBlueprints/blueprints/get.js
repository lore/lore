var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');

module.exports = function(modelName, models) {

  var Model = models[modelName];

  return {
    blueprint: 'get',

    model: Model,

    optimistic: {
      actionType: ActionTypes.add(modelName),
      payloadState: PayloadStates.FETCHING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_FETCHING
    },

    onNotFound: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.NOT_FOUND
    }
  }
};

