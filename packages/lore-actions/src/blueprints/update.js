import { ActionTypes, PayloadStates } from '@lore/utils';
import update from '../_blueprints/update';

export default function(modelName, Model, options = {}) {
  const { normalizer } = options;

  return update({
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
    },

    normalize: {

      // look through the model and generate actions for any attributes with
      // nested data that should be normalized
      getActions: function(model) {
        return normalizer.model(model);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }
  });
}
