var _ = require('lodash');
var React = require('react');
var AuthorizationGenerator = require('lore-auth').generators.AuthorizationGenerator;
var PermissionTypes = require('../../constants/PermissionTypes');

module.exports = AuthorizationGenerator({
  wrapperDisplayName: 'UserCanDestroyTodo',

  isAuthorized: function (storeState) {
    var userPermissions = storeState.permission.forCurrentUser;

    var hasPermission = _.find(userPermissions.data, function(permission) {
      return permission.data.name === PermissionTypes.TODO_DESTROY;
    });

    return hasPermission;
  }

});
