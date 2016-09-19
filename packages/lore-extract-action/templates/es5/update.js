var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;

/*
 * Blueprint for Update method
 */
module.exports = function update(model, params) {
  return function(dispatch) {
    var Model = lore.models.<%= modelName %>;
    var proxyModel = new Model(model.data);
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
      var error = response.data;

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
