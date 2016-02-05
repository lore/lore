var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

module.exports = function(modelName, models) {

  var Model = models[modelName];

  return {
    blueprint: 'fetch',

    model: Model,

    optimistic: {
      actionType: ActionTypes.add(modelName),
      payloadState: PayloadStates.FETCHING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.EXISTS
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_FETCHING
    }
  }
};

