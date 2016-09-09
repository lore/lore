/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var Promise = require('bluebird');
var PermissionTypes = require('../api/constants/PermissionTypes');
var _ = require('lodash');

function createUsers() {
  return User.create([
    {
      nickname: 'admin',
      authId: 'auth0|57d05cd9a7eff8334e59199a'
    },
    {
      nickname: 'user',
      authId: 'auth0|57d05c64a164af8c3bed8c57'
    }
  ]);
}

function createPermissions() {
 return Permission.create([
   {
     name: PermissionTypes.TODO_CREATE,
     description: 'Can create Todos'
   },
   {
     name: PermissionTypes.TODO_RETRIEVE,
     description: 'Can retrieve Todos'
   },
   {
     name: PermissionTypes.TODO_UPDATE,
     description: 'Can edit Todos'
   },
   {
     name: PermissionTypes.TODO_DESTROY,
     description: 'Can delete Todos'
   }
 ]);
}

module.exports.bootstrap = function(cb) {
  Promise.all([
    createUsers(),
    createPermissions()
  ]).spread(function(users, permissions) {
    var admin = _.find(users, {nickname: 'admin'});
    var user = _.find(users, {nickname: 'user'});

    return UserPermission.create([
      {user: admin, permission: _.find(permissions, {name: PermissionTypes.TODO_CREATE})},
      {user: admin, permission: _.find(permissions, {name: PermissionTypes.TODO_RETRIEVE})},
      {user: admin, permission: _.find(permissions, {name: PermissionTypes.TODO_UPDATE})},
      {user: admin, permission: _.find(permissions, {name: PermissionTypes.TODO_DESTROY})},
      {user: user, permission: _.find(permissions, {name: PermissionTypes.TODO_RETRIEVE})},
      {user: user, permission: _.find(permissions, {name: PermissionTypes.TODO_UPDATE})}
    ]);
  }).then(function(userPermissions){
    cb();
  });
};
