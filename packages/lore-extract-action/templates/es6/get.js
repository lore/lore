import _ from 'lodash';
import { ActionTypes, PayloadStates, payload } from 'lore-utils';

/*
 * Blueprint for Get method
 */
module.exports = function get(modelId) {
  return function(dispatch) {
    const Model = lore.models.<%= modelName %>;
    const model = new Model({
      id: modelId
    });

    model.fetch().then(function() {
      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      const error = response.data;

      if (response.status === 404) {
        dispatch({
          type: ActionTypes.update('<%= modelName %>'),
          payload: _.merge(payload(model), {
            state: PayloadStates.NOT_FOUND,
            error: error
          })
        });
      } else {
        dispatch({
          type: ActionTypes.update('<%= modelName %>'),
          payload: payload(model, PayloadStates.ERROR_FETCHING, error)
        });
      }
    });

    return dispatch({
      type: ActionTypes.add('<%= modelName %>'),
      payload: payload(model, PayloadStates.FETCHING)
    });
  };
};
