var ActionTypes = require('../../../utils/ActionTypes');
var PayloadStates = require('../../../utils/PayloadStates');
var _ = require('lodash');

/*
 * find Reducer Blueprint
 */

function intersectionOfDataAndDictionaryKeys(data, dictionary) {
  var ids = _.map(data, 'id');
  var dictionaryKeys = _.keys(dictionary);
  var idsInDictionary = _.intersection(ids, dictionaryKeys);
  return idsInDictionary.map(function (id) {
    return dictionary[id];
  });
}

function mergeDataAndIntersectWithDictionaryKeys(oldData, newData, dictionary) {
  var ids = _.map(oldData, 'id');
  var newIds = _.map(newData, 'id');
  var combinedIds = _.union(ids, newIds);
  var dictionaryKeys = _.keys(dictionary);
  var idsInDictionary = _.intersection(combinedIds, dictionaryKeys);
  return idsInDictionary.map(function (id) {
    return dictionary[id];
  });
}

function mergeMissingDataIntoDictionary(data, query, state) {
  var byCid = state.byCid;

  _.keys(byCid).forEach(function (cid) {
    var datum = byCid[cid];
    var existingDatum = _.findWhere(data, { cid: cid });

    // if the datum is not in the data set
    if (!existingDatum) {
      // if this is the empty query add it (it stores everything)
      if (Object.keys(query).length === 0) {
        data.push(datum);

        // else if the datum matches the query, add it
      } else if (_.findWhere([datum.data], query)) {
          data.push(datum);
        }
    }
  });
}

module.exports = function (modelName) {

  var initialState = {};
  var EMPTY_QUERY_KEY = JSON.stringify({});

  return function find(state, action, options) {
    state = state || initialState;
    var nextState = _.assign({}, state);
    var byId = options.nextState.byId;
    var byCid = options.nextState.byCid;

    // update the data in each query to reflect what's in the dictionary
    // will update data that's changed and remove data that doesn't exist
    _.keys(nextState).forEach(function (query) {
      var queryState = nextState[query];
      nextState[query] = _.assign({}, queryState, {
        data: intersectionOfDataAndDictionaryKeys(queryState.data, byId)
      });
    });

    _.keys(nextState).forEach(function (queryKey) {
      var queryState = nextState[queryKey];
      var query = JSON.parse(queryKey);
      mergeMissingDataIntoDictionary(queryState.data, query, options.nextState);

      // sort the data by cid, so it has some kind of default ordering
      _.sortBy(queryState.data, 'cid');
    });

    switch (action.type) {
      case ActionTypes.fetchPlural(modelName):
        var query = JSON.stringify(action.query);
        nextState[query] = nextState[query] || {};
        nextState[query] = _.assign({}, action.payload, {
          data: mergeDataAndIntersectWithDictionaryKeys(nextState[query].data, action.payload.data, byId)
        });
        return nextState;

      default:
        return nextState;
    }
  };
};