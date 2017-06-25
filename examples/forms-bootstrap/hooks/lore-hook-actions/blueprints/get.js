var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var normalize = require('../normalize');

module.exports = function(modelName, models, lore) {

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
    },

    normalize: {

      // look through the model and generate actions for any attributes with
      // nested data that should be normalized
      getActions: function(model) {
        return normalize(lore, modelName).model(model);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }

  }
};

