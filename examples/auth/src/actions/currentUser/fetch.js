var ActionTypes = require('../../constants/ActionTypes');
var PayloadStates = require('../../constants/PayloadStates');
var utils = require('lore-actions/lib/utils');

/*
 * Fetch the current user
 */
module.exports =  function fetch() {
  return function(dispatch) {
    var CurrentUser = lore.models.currentUser;
    var user = new CurrentUser();

    user.fetch().then(function() {
      var PermissionCollection = lore.collections.permission;
      var userPermissions = new PermissionCollection(user.attributes.permissions);

      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: utils.payload(user, PayloadStates.RESOLVED)
      });

      dispatch({
        type: ActionTypes.PERMISSIONS_FOR_CURRENT_USER,
        payload: utils.payloadCollection(userPermissions, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: utils.payload(user, PayloadStates.ERROR_FETCHING, error)
      });
    });

    return dispatch({
      type: ActionTypes.FETCH_CURRENT_USER,
      payload: utils.payload(user, PayloadStates.FETCHING)
    });
  };
};
