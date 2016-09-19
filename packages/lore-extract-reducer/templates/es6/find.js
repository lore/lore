import { ActionTypes } from 'lore-utils';
import _ from 'lodash';

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

function mergeMissingDataIntoDictionary(data, query, byCid) {
  const where = query.where;
  const pagination = query.pagination;

  // Do NOT add data to paginated data sets. This function only exists
  // to facilitate use cases where the user needs to display ALL results
  // or results for simple queries (like authorId=xyz)
  if (pagination && Object.keys(pagination).length > 0) {
    return;
  }

  _.keys(byCid).forEach(function(cid) {
    const datum = byCid[cid];
    const existingDatum = _.find(data, { cid: cid });

    // if the datum is not in the data set
    if (!existingDatum) {
      // if this is the empty query add it (it stores everything)
      if (Object.keys(where).length === 0) {
        data.push(datum);

      // else if the datum matches the 'where' query, add it
      } else if (_.find([datum.data], where)) {
        data.push(datum);
      }
    }
  })
}

const SETTINGS = {
  REMOVE_DESTROYED_DATA: true,
  ADD_NEW_DATA_TO_QUERIES: true
};

const initialState = {};

export default function find(state, action, options) {
  state = state || initialState;

  let nextState = _.assign({}, state);
  const byId = options.nextState.byId;
  const byCid = options.nextState.byCid;

  // Remove any data that no longer exists in byId
  // This usually means it was deleted
  if (SETTINGS.REMOVE_DESTROYED_DATA) {
    nextState = _.mapValues(nextState, function(collection, key) {
      const ids = collection.data.map(function(data){
        // id will not always exist for the empty query case: {}
        return data.id ? data.id.toString() : data.id;
      });

      // get the list of ids that still exist
      const idsThatExist = _.keys(byId);

      // get the list of ids that should remain in the collection
      const validIds = _.intersection(ids, idsThatExist);

      // convert the array of ids in the collection back to real objects
      collection.data = validIds.map(function(id) {
        return byId[id];
      });

      return collection;
    });
  }

  // This adds new data to queries it should be in...
  // Unsure whether this is good or bad...what are the limits?
  if (SETTINGS.ADD_NEW_DATA_TO_QUERIES) {
    nextState = _.mapValues(nextState, function(collection, key) {
      const query = JSON.parse(key);

      mergeMissingDataIntoDictionary(collection.data, query, byCid);

      // sort the data by cid, so it has some kind of default ordering
      _.sortBy(collection.data, 'cid');

      return collection;
    });
  }

  switch (action.type) {
    case ActionTypes.fetchPlural('<%= modelName %>'):
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

    default:
      return nextState
  }
};
