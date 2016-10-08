var _ = require('lodash');
var ActionTypes = require('../../constants/ActionTypes');
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-actions').utils.payload;

module.exports = function get() {
  return function(dispatch) {
    var Model = lore.models.currentUser;
    var model = new Model();

    model.fetch().then(function() {
      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: payload(model, PayloadStates.ERROR_FETCHING, error)
      });
    });

    return dispatch({
      type: ActionTypes.FETCH_CURRENT_USER,
      payload: payload(model, PayloadStates.FETCHING)
    });
  };
};
