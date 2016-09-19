import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection } from 'lore-utils';

/*
 * Blueprint for Find method
 */

export default function find(query = {}, pagination) {
  return function(dispatch) {
    const Collection = lore.models.<%= modelName %>;
    const collection = new Collection();

    const queryParameters = _.extend({}, query, pagination);

    const combinedQuery = {
      where: query,
      pagination: pagination
    };

    collection.fetch({
      data: queryParameters
    }).then(function() {
      dispatch({
        type: ActionTypes.fetchPlural('<%= modelName %>'),
        payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
        query: combinedQuery
      });
    }).catch(function(response) {
      const error = response.data;

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
