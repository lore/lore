var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;

/*
 * Blueprint for Create method
 */
module.exports = function create(params) {
  return function(dispatch) {
    var Model = lore.models.<%= modelName %>;
    var model = new Model(params);

    model.save().then(function() {
      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

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
