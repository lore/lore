import _ from 'lodash';
import { AuthorizationGenerator } from 'lore-auth';
import PermissionTypes from '../../constants/PermissionTypes';

export default AuthorizationGenerator({
  wrapperDisplayName: 'UserCanEditTodo',

  isAuthorized: function () {
    const storeState = lore.store.getState();
    const userPermissions = storeState.permission.forCurrentUser;

    const hasPermission = _.find(userPermissions.data, function(permission) {
      return permission.data.name === PermissionTypes.TODO_UPDATE;
    });

    return hasPermission;
  }

});
