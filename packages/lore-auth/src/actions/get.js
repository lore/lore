/* eslint consistent-return: "off" */

import { ActionTypes, PayloadStates, payload } from '@lore/utils';
import * as Sentry from '@sentry/browser';

/*
 * Blueprint for Get method
 */

export default function(modelName, Model, { normalizer }) {
  return function get() {
    return function(dispatch) {
      const model = new Model();

      model.fetch().then(function() {
        // look through the model and generate actions for any attributes with
        // nested data that should be normalized
        const actions = normalizer.model(model);

        dispatch({
          type: ActionTypes.update(modelName),
          payload: payload(model, PayloadStates.RESOLVED)
        });

        // dispatch any actions created from normalizing nested data
        actions.forEach(dispatch);
      }).catch(function(response) {
        const error = response.data;

        Sentry.withScope(scope => {
          Object.keys(response).forEach(key => {
            scope.setExtra(key, response[key]);
          });
          Sentry.captureException(new Error('user:get'));
        });

        dispatch({
          type: ActionTypes.update(modelName),
          payload: payload(model, PayloadStates.ERROR_FETCHING, error)
        });
      });

      return dispatch({
        type: ActionTypes.add(modelName),
        payload: payload(model, PayloadStates.FETCHING)
      });
    };
  };
}
