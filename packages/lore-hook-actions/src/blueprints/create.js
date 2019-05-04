import { ActionTypes, PayloadStates, normalize } from 'lore-utils';

export default function(modelName, models, options = {}, lore) {
  const Model = models[modelName];

  return {
    blueprint: 'create',

    model: Model,

    addCidToBody: options.addCidToBody || false,

    cidBodyAttributeName: options.cidField || 'cid',

    optimistic: {
      actionType: ActionTypes.add(modelName),
      payloadState: PayloadStates.CREATING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_CREATING,
      beforeDispatch: function(response, args) {
        // no op
      }
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
  };
}
