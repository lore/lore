var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

module.exports = function(modelName, models) {

  var Model = models[modelName];

  return {
    blueprint: 'update',

    model: Model,

    optimistic: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.UPDATING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_UPDATING
    },

    onNotFound: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.NOT_FOUND
    }
  }
};
