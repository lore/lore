import { ActionTypes, PayloadStates } from '@lore/utils';
import find from '../_blueprints/find';

export default function(modelName, Collection, options = {}) {
  const { normalizer } = options;

  return find({
    collection: Collection,

    optimistic: {
      actionType: ActionTypes.fetchPlural(modelName),
      payloadState: PayloadStates.FETCHING
    },

    onSuccess: {
      actionType: ActionTypes.fetchPlural(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.fetchPlural(modelName),
      payloadState: PayloadStates.ERROR_FETCHING
    },

    normalize: {

      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      getActions: function(collection) {
        return normalizer.collection(collection);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }

  });
}
