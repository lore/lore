import { ActionTypes, PayloadStates } from '@lore/utils';
import destroy from '../_blueprints/destroy';

export default function(modelName, Model, options = {}) {
  const { normalizer } = options;

  return destroy({
    model: Model,

    optimistic: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.DELETING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.DELETED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_DELETING
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
