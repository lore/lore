var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;
var normalize = require('lore-utils').normalize;

/*
 * Blueprint for Get method
 */
module.exports = function get(modelId, query) {
  return function(dispatch) {
    var Model = lore.models.<%= modelName %>;
    var model = new Model({
      id: modelId
    });
    query = query || {};

    model.fetch({
      data: query
    }).then(function() {
      // look through the model and generate actions for any attributes with
      // nested data that should be normalized
      var actions = normalize(lore, '<%= modelName %>').model(model);

      dispatch({
        type: ActionTypes.update('<%= modelName %>'),
        payload: payload(model, PayloadStates.RESOLVED)
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
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
