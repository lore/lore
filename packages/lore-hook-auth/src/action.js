import { ActionTypes, PayloadStates } from 'lore-utils';
import { utils } from 'lore-actions';

const payload = utils.payload;

export default function(modelName, models) {
  const Model = models[modelName];

  return function get() {
    return function(dispatch) {
      const model = new Model();

      model.fetch().then(function() {
        dispatch({
          type: ActionTypes.update(modelName),
          payload: payload(model, PayloadStates.RESOLVED)
        });
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
