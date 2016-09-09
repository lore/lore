var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

/*
 * find Reducer Blueprint
 */

function mergeDataAndIntersectWithDictionaryKeys(oldData, newData, dictionary) {
  var ids = _.map(oldData, 'id');
  var newIds = _.map(newData, 'id');
  var combinedIds = _.union(ids, newIds);
  var dictionaryKeys = _.keys(dictionary);

  // If any ids are Numbers, convert them to Strings so we can compare equality
  // with the dictionary keys
  var combinedIdsAsStrings = combinedIds.map(function(id) {
    return id.toString();
  });

  var idsInDictionary = _.intersection(combinedIdsAsStrings, dictionaryKeys);
  return idsInDictionary.map(function(id) {
    return dictionary[id];
  });
}

function mergeMissingDataIntoDictionary(data, query, byCid) {
  var where = query.where;
  var pagination = query.pagination;

  // Do NOT add data to paginated data sets. This function only exists
  // to facilitate use cases where the user needs to display ALL results
  // or results for simple queries (like authorId=xyz)
  if (pagination && Object.keys(pagination).length > 0) {
    return;
  }

  _.keys(byCid).forEach(function(cid) {
    var datum = byCid[cid];
    var existingDatum = _.findWhere(data, { cid: cid });

    // if the datum is not in the data set
    if (!existingDatum) {
      // if this is the empty query add it (it stores everything)
      if (Object.keys(where).length === 0) {
        data.push(datum);

      // else if the datum matches the 'where' query, add it
      } else if (_.findWhere([datum.data], where)) {
        data.push(datum);
      }
    }
  })
}

var SETTINGS = {
  REMOVE_DESTROYED_DATA: true,
  ADD_NEW_DATA_TO_QUERIES: true
};

module.exports = function(modelName) {

  var initialState = {};
  var EMPTY_QUERY_KEY = JSON.stringify({});

  return function find(state, action, options) {
    state = state || initialState;
    var nextState = _.assign({}, state);
    var byId = options.nextState.byId;
    var byCid = options.nextState.byCid;

    // Remove any data that no longer exists in byId
    // This usually means it was deleted
    if (SETTINGS.REMOVE_DESTROYED_DATA) {
      nextState = _.mapValues(nextState, function(collection, key) {
        var ids = collection.data.map(function(data){
          // id will not always exist for the empty query case: {}
          return data.id ? data.id.toString() : data.id;
        });

        // get the list of ids that still exist
        var idsThatExist = _.keys(byId);

        // get the list of ids that should remain in the collection
        var validIds = _.intersection(ids, idsThatExist);

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
        var query = JSON.parse(key);

        mergeMissingDataIntoDictionary(collection.data, query, byCid);

        // sort the data by cid, so it has some kind of default ordering
        _.sortBy(collection.data, 'cid');

        return collection;
      });
    }

    switch (action.type) {
      case ActionTypes.fetchPlural(modelName):
        var query = JSON.stringify(action.query);
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

};
