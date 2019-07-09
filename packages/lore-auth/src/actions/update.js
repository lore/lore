/* eslint consistent-return: "off" */

import _ from 'lodash';
import { ActionTypes, PayloadStates } from '@lore/utils';

/*
 * Blueprint for Update method
 */

export default function(modelName, Model, { normalizer }) {
  return function update(model, params) {
    return function(dispatch) {
      const proxyModel = new Model(model.data);
      proxyModel.set(params);

      proxyModel.save().then(function() {
        // look through the model and generate actions for any attributes with
        // nested data that should be normalized
        const actions = normalizer.model(proxyModel);

        dispatch({
          type: ActionTypes.update(modelName),
          payload: _.merge(model, {
            data: proxyModel.toJSON(),
            state: PayloadStates.RESOLVED
          })
        });

        // dispatch any actions created from normalizing nested data
        actions.forEach(dispatch);
      }).catch(function(err) {
        const response = err.response;
        const error = response.data;

        dispatch({
          type: ActionTypes.update(modelName),
          payload: _.merge(model, {
            data: proxyModel.toJSON(),
            state: PayloadStates.ERROR_UPDATING,
            error: error
          })
        });
      });

      return dispatch({
        type: ActionTypes.update(modelName),
        payload: _.merge(model, {
          data: proxyModel.toJSON(),
          state: PayloadStates.UPDATING
        })
      });
    };
  };
}
