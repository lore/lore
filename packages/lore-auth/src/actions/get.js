/* eslint consistent-return: "off" */

import { ActionTypes, PayloadStates, payload } from '@lore/utils';

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
