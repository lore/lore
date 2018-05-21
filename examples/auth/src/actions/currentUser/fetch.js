import ActionTypes from '../../constants/ActionTypes';
import PayloadStates from '../../constants/PayloadStates';
import { payload, payloadCollection } from 'lore-utils';

/*
 * Fetch the current user
 */
export default function fetch() {
  return function(dispatch) {
    const CurrentUser = lore.models.currentUser;
    const user = new CurrentUser();

    user.fetch().then(function() {
      const PermissionCollection = lore.collections.permission;
      const userPermissions = new PermissionCollection(user.attributes.permissions);

      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: payload(user, PayloadStates.RESOLVED)
      });

      dispatch({
        type: ActionTypes.PERMISSIONS_FOR_CURRENT_USER,
        payload: payloadCollection(userPermissions, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      const error = response.data;

      dispatch({
        type: ActionTypes.FETCH_CURRENT_USER,
        payload: payload(user, PayloadStates.ERROR_FETCHING, error)
      });
    });

    return dispatch({
      type: ActionTypes.FETCH_CURRENT_USER,
      payload: payload(user, PayloadStates.FETCHING)
    });
  };
};
