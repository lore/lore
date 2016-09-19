var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;

/*
 * Blueprint for Get method
 */
module.exports = function get(modelId) {
  return function(dispatch) {
    var Model = lore.models.<%= modelName %>;
    var model = new Model({
      id: modelId
    });

    model.fetch().then(function() {
      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

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
