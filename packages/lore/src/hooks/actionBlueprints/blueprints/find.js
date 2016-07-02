var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');

module.exports = function(collectionName, collections) {

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
    }

  };
};
