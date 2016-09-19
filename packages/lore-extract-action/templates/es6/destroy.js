import _ from 'lodash';
import { ActionTypes, PayloadStates } from 'lore-utils';

/*
 * Blueprint for Destroy method
 */
export default function destroy(model) {
  return function(dispatch) {
    const Model = lore.models.<%= modelName %>;
    const proxyModel = new Model(model.data);

    proxyModel.destroy().then(function() {
      dispatch({
        type: ActionTypes.remove('<%= modelName %>'),
        payload: _.merge(model, {
          state: PayloadStates.RESOLVED
        })
      });
    }).catch(function(response) {
      const error = response.data;

      if (response.status === 404) {
        dispatch({
          type: ActionTypes.update('<%= modelName %>'),
          payload: _.merge(model, {
            state: PayloadStates.NOT_FOUND,
            error: error
          })
        });
      } else {
        dispatch({
          type: ActionTypes.update('<%= modelName %>'),
          payload: _.merge(model, {
            state: PayloadStates.ERROR_DELETING,
            error: error
          })
        });
      }
    });

    return dispatch({
      type: ActionTypes.update('<%= modelName %>'),
      payload: _.merge(model, {
        state: PayloadStates.DELETING
      })
    });
  };
};
