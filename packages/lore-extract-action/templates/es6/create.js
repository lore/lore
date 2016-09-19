import { ActionTypes, PayloadStates, payload } from 'lore-utils';

/*
 * Blueprint for Create method
 */
export default function create(params) {
  return function(dispatch) {
    const Model = lore.models.<%= modelName %>;
    const model = new Model(params);

    model.save().then(function() {
      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      const error = response.data;

      dispatch({
        type: ActionTypes.remove('<%= modelName %>'),
        payload: payload(model, PayloadStates.ERROR_CREATING, error)
      });
    });

    return dispatch({
      type: ActionTypes.add('<%= modelName %>'),
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};
