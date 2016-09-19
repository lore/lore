var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;

/*
 * Blueprint for Destroy method
 */
module.exports = function destroy(model) {
  return function(dispatch) {
    var Model = lore.models.<%= modelName %>;
    var proxyModel = new Model(model.data);

    proxyModel.destroy().then(function() {
      dispatch({
        type: ActionTypes.remove('<%= modelName %>'),
        payload: _.merge(model, {
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
