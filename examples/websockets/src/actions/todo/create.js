import { ActionTypes, PayloadStates, payload, normalize } from 'lore-utils';
import uuid from 'node-uuid';

export default function create(params) {
  return function(dispatch) {
    const Model = lore.models.todo;
    const model = new Model(params);
    model.cid = uuid.v4();
    model.set('cid', model.cid);

    model.save().then(function() {
      // look through the model and generate actions for any attributes with
      // nested data that should be normalized
      const actions = normalize(lore, 'todo').model(model);

      dispatch({
        type: ActionTypes.update('todo'),
        payload: payload(model, PayloadStates.RESOLVED)
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
    }).catch(function(response) {
      const error = response.data;

      dispatch({
        type: ActionTypes.remove('todo'),
        payload: payload(model, PayloadStates.ERROR_CREATING, error)
      });
    });

    return dispatch({
      type: ActionTypes.add('todo'),
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};
