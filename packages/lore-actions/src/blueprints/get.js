/* eslint consistent-return: "off" */

import _ from 'lodash';
import utils from '../utils';

const { payload, defaultOptions, validatePartialPairs } = utils;

/*
 * Blueprint for Get method
 */
export default function(opts = {}) {
  // clone the options so we don't unintentionally modify them
  let options = _.cloneDeep(opts);

  options = _.defaultsDeep(options, defaultOptions);

  if (!options.model) {
    throw new Error('Must specify a model');
  }

  const Model = options.model;

  validatePartialPairs(options);

  return function get(modelId, query = {}) {
    return function(dispatch) {
      const model = new Model({
        id: modelId
      });

      model.fetch({
        data: query
      }).then(function() {
        if (options.onSuccess) {
          let actions = [];

          if (options.normalize && options.normalize.getActions) {
            // look through the model and generate actions for any attributes with
            // nested data that should be normalized
            actions = options.normalize.getActions(model);
          }

          dispatch({
            type: options.onSuccess.actionType,
            payload: payload(model, options.onSuccess.payloadState)
          });

          if (options.normalize && options.normalize.dispatchActions) {
            // dispatch any actions created from normalizing nested data
            options.normalize.dispatchActions(actions, dispatch);
          }
        }
      }).catch(function(response) {
        const error = response.data;

        if (response.status === 404) {
          if (options.onNotFound) {
            if (options.onNotFound.beforeDispatch) {
              options.onNotFound.beforeDispatch(response, [model]);
            }

            dispatch({
              type: options.onNotFound.actionType,
              payload: _.merge(payload(model), {
                state: options.onNotFound.payloadState,
                error: error
              })
            });
          }
        } else if (options.onError) {
          if (options.onError.beforeDispatch) {
            options.onError.beforeDispatch(response, [modelId]);
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
}
