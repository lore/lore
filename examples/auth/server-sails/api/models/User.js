/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    token: {
      type: 'string'
    },
    authId: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    nickname: {
      type: 'string'
    },
    picture: {
      type: 'string'
    },
    permissions:{
      collection: 'permission',
      via: 'permission',
      through: 'userpermission'
    }
  }
};

