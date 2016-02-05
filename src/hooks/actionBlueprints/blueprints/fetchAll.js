var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var utils = require('../../../../packages/lore-actions').utils;

function hackPayloadCollection(collection, query, payloadState) {
  if (Object.keys(query).length === 0) {
    return utils.payloadCollection(collection, payloadState);
  }

  var queryParam = Object.keys(query)[0];
  var value = query[queryParam];

  return utils.payloadCollection({
    models: collection.models.filter(function (models) {
      return models.get(queryParam) === value;
    })
  }, payloadState);
}

module.exports = function(collectionName, collections) {

  var Collection = collections[collectionName];

  return function fetchAll(query) {
    query = query || {};

    return function(dispatch) {
      var collection = new Collection();

      collection.fetch({
        data: query
      }).then(function () {
        dispatch({
          type: ActionTypes.fetchPlural(collectionName),
          payload: hackPayloadCollection(collection, query, PayloadStates.EXISTS),
          query: query
        })
      }).catch(function (response) {
        var error = response.responseJSON;
        dispatch({
          type: ActionTypes.fetchPlural(collectionName),
          payload: utils.payload(collection, PayloadStates.ERROR_FETCHING, error),
          query: query
        })
      });

      // todo: add ERROR_FETCHING state

      return dispatch({
        type: ActionTypes.fetchPlural(collectionName),
        payload: utils.payloadCollection(collection, PayloadStates.FETCHING),
        query: query
      })
    }
  }
};
