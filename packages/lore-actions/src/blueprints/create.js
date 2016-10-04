const _ = require('lodash');
const { payload, defaultOptions, validatePartialPairs } = require('../utils');

/*
 * Blueprint for Create method
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

  return function create(params) {
    return function(dispatch) {
      const model = new Model(params);

      if (options.addCidToBody) {
        model.set(options.cidBodyAttributeName, model.cid);
      }

      model.save().then(function() {
        if (options.onSuccess) {
          dispatch({
            type: options.onSuccess.actionType,
            payload: payload(model, options.onSuccess.payloadState)
          });
        }
      }).catch(function(response) {
        if (options.onError) {
          const error = response.data;

          if (options.onError.beforeDispatch) {
            options.onError.beforeDispatch(response, [model]);
          }

          dispatch({
            type: options.onError.actionType,
            payload: payload(model, options.onError.payloadState, error)
          });
        }
      });

      if (options.optimistic) {
        return dispatch({
          type: options.optimistic.actionType,
          payload: payload(model, options.optimistic.payloadState)
        });
      }
    };
  };
};
