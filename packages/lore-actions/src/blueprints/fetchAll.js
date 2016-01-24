const _ = require('lodash');
const { payloadCollection, defaultOptions, validatePartialPairs } = require('../utils');

/*
 * Blueprint for FetchAll method
 */

module.exports = function(opts = {}) {
  // clone the options so we don't unintentionally modify them
  let options = _.cloneDeep(opts);

  options = _.defaultsDeep(options, defaultOptions);

  if (!options.collection) {
    throw new Error('Must specify a collection');
  }

  const Collection = options.collection;

  validatePartialPairs(options);

  return function fetchAll(query = {}) {
    return function(dispatch) {
      const collection = new Collection();

      collection.fetch({
        data: query
      }).done(function() {
        if (options.onSuccess) {
          dispatch({
            type: options.onSuccess.actionType,
            payload: payloadCollection(collection, options.onSuccess.payloadState),
            query: query
          });
        }
      }).fail(function(response) {
        if (options.onError) {
          const error = response.responseJSON;

          if (options.onError.beforeDispatch) {
            options.onError.beforeDispatch(response, [query]);
          }

          dispatch({
            type: options.onError.actionType,
            payload: payloadCollection(collection, options.onError.payloadState, error),
            query: query
          });
        }
      });

      if (options.optimistic) {
        return dispatch({
          type: options.optimistic.actionType,
          payload: payloadCollection(collection, options.optimistic.payloadState),
          query: query
        });
      }
    };
  };
};
