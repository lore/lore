var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payloadCollection = require('lore-utils').payloadCollection;
var normalize = require('lore-hook-actions/lib/normalize');

/*
 * Blueprint for Find method
 */

module.exports = function find(query = {}, pagination) {
  return function(dispatch) {
    var Collection = lore.collections.<%= modelName %>;
    var collection = new Collection();

    var queryParameters = _.extend({}, query, pagination);

    var combinedQuery = {
      where: query,
      pagination: pagination
    };

    collection.fetch({
      data: queryParameters
    }).then(function() {
      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      var actions = normalize(lore, '<%= modelName %>').collection(collection);

      dispatch({
        type: ActionTypes.fetchPlural('<%= modelName %>'),
        payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
        query: combinedQuery
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
    }).catch(function(response) {
      var error = response.data;

      dispatch({
        type: ActionTypes.fetchPlural('<%= modelName %>'),
        payload: payloadCollection(collection, PayloadStates.ERROR_FETCHING, error, combinedQuery),
        query: combinedQuery
      });
    });

    return dispatch({
      type: ActionTypes.fetchPlural('<%= modelName %>'),
      payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
      query: combinedQuery
    });
  };
};
