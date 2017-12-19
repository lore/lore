/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { ActionTypes } from 'lore-utils';

/*
 * find Reducer Blueprint
 */

function mergeDataAndIntersectWithDictionaryKeys(oldData, newData, dictionary) {
  const ids = _.map(oldData, 'id');
  const newIds = _.map(newData, 'id');
  const combinedIds = _.union(ids, newIds);
  const dictionaryKeys = _.keys(dictionary);

  // If any ids are Numbers, convert them to Strings so we can compare equality
  // with the dictionary keys
  const combinedIdsAsStrings = combinedIds.map(function(id) {
    return id.toString();
  });

  const idsInDictionary = _.intersection(combinedIdsAsStrings, dictionaryKeys);
  return idsInDictionary.map(function(id) {
    return dictionary[id];
  });
}

export default function(modelName) {
  const initialState = {};
  // const EMPTY_QUERY_KEY = JSON.stringify({});

  return function find(state, action, options) {
    state = state || initialState;
    let nextState = _.assign({}, state);
    const byId = options.nextState.byId;
    const byCid = options.nextState.byCid;

    switch (action.type) {
      case ActionTypes.fetchPlural(modelName): {
        const query = JSON.stringify(action.query);
        nextState[query] = nextState[query] || {};
        nextState[query] = _.assign({}, action.payload, {
          data: mergeDataAndIntersectWithDictionaryKeys(
            nextState[query].data,
            action.payload.data,
            byId
          )
        });
        return nextState;
      }

      case ActionTypes.refetchPlural(modelName): {
        const query = JSON.stringify(action.query);
        nextState[query] = nextState[query] || {};
        nextState[query] = _.assign({}, action.payload, {
          data: mergeDataAndIntersectWithDictionaryKeys(
            [],
            action.payload.data,
            byId
          )
        });
        return nextState;
      }

      case ActionTypes.update(modelName): {
        nextState = _.mapValues(nextState, function(collection, key) {
          collection.data = collection.data.map(function(datum) {
            if (datum.id === action.payload.id) {
              return action.payload;
            }
            return datum;
          });

          return collection;
        });
        return nextState;
      }

      case ActionTypes.remove(modelName): {
        nextState = _.mapValues(nextState, function(collection, key) {
          collection.data = collection.data.map(function(datum) {
            if (datum.id === action.payload.id) {
              return action.payload;
            }
            return datum;
          });

          return collection;
        });
        return nextState;
      }

      default:
        return nextState;
    }
  };
}
