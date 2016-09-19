import _ from 'lodash';
import { ActionTypes, PayloadStates } from 'lore-utils';

/*
 * Blueprint for Update method
 */
export default function update(model, params) {
  return function(dispatch) {
    const Model = lore.models.<%= modelName %>;
    const proxyModel = new Model(model.data);
    proxyModel.set(params);

    proxyModel.save().then(function() {
      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: _.merge(model, {
          data: proxyModel.toJSON(),
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
            data: proxyModel.toJSON(),
            state: PayloadStates.ERROR_UPDATING,
            error: error
          })
        });
      }
    });

    return dispatch({
      type: ActionTypes.update('<%= modelName %>'),
      payload: _.merge(model, {
        data: proxyModel.toJSON(),
        state: PayloadStates.UPDATING
      })
    });
  };
};
