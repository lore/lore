var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var normalize = require('../normalize');

module.exports = function(collectionName, collections, lore) {

  var Collection = collections[collectionName];

  return {
    blueprint: 'find',

    collection: Collection,

    optimistic: {
      actionType: ActionTypes.fetchPlural(collectionName),
      payloadState: PayloadStates.FETCHING
    },

    onSuccess: {
      actionType: ActionTypes.fetchPlural(collectionName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.fetchPlural(collectionName),
      payloadState: PayloadStates.ERROR_FETCHING
    },

    normalize: {

      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      getActions: function(collection) {
        return normalize(lore, collectionName).collection(collection);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }

  };
};
