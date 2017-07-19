import { ActionTypes, PayloadStates } from 'lore-utils';

export default function(modelName, models) {
  const Model = models[modelName];

  return {
    blueprint: 'destroy',

    model: Model,

    optimistic: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.DELETING
    },

    onSuccess: {
      actionType: ActionTypes.remove(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_DELETING
    },

    onNotFound: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.NOT_FOUND
    }

  };
}
