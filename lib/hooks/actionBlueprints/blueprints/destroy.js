var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

module.exports = function (modelName, models) {

  var Model = models[modelName];

  return {
    blueprint: 'destroy',

    model: Model,

    optimistic: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.DELETING
    },

    onSuccess: {
      actionType: ActionTypes.remove(modelName),
      payloadState: PayloadStates.NONEXISTENT
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_DELETING
    }

  };
};