var _ = require('lodash');
var React = require('react');
var AuthorizationGenerator = require('lore-auth').AuthorizationGenerator;
var PermissionTypes = require('../../constants/PermissionTypes');

module.exports = AuthorizationGenerator({
  wrapperDisplayName: 'UserCanCreateTodo',

  isAuthorized: function (storeState) {
    var userPermissions = storeState.permission.forCurrentUser;

    var hasPermission = _.find(userPermissions.data, function(permission) {
      return permission.data.name === PermissionTypes.TODO_CREATE;
    });

    return hasPermission;
  }

});
