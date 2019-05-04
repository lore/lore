import { ActionTypes, PayloadStates } from '@lore/utils';
import create from '../_blueprints/create';

export default function(modelName, Model, options = {}) {
  const {
    addCidToBody,
    cidBodyAttributeName,
    normalizer
  }  = options;

  return create({
    model: Model,

    addCidToBody: addCidToBody || false,

    cidBodyAttributeName: cidBodyAttributeName || 'cid', // cidField

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
        return normalizer.model(model);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }
  });
}
