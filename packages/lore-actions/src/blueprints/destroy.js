const _ = require('lodash');
const { defaultOptions, validatePartialPairs } = require('../utils');

/*
 * Blueprint for Destroy method
 */
module.exports = function(opts = {}) {
  // clone the options so we don't unintentionally modify them
  let options = _.cloneDeep(opts);

  options = _.defaultsDeep(options, defaultOptions);

  if (!options.model) {
    throw new Error('Must specify a model');
  }

  const Model = options.model;

  validatePartialPairs(options);

  return function destroy(model) {
    return function(dispatch) {
      const proxyModel = new Model(model.data);

      proxyModel.destroy().then(function() {
        if (options.onSuccess) {
          dispatch({
            type: options.onSuccess.actionType,
            payload: _.merge(model, {
              state: options.onSuccess.payloadState
            })
          });
        }
      }).catch(function(response) {
        if (options.onError) {
          const error = response.responseJSON;

          if (options.onError.beforeDispatch) {
            options.onError.beforeDispatch(response, [model]);
          }

          dispatch({
            type: options.onError.actionType,
            payload: _.merge(model, {
              state: options.onError.payloadState,
              error: error
            })
          });
        }
      });

      if (options.optimistic) {
        return dispatch({
          type: options.optimistic.actionType,
          payload: _.merge(model, {
            state: options.optimistic.payloadState
          })
        });
      }
    };
  };
};
