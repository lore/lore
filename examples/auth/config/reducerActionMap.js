module.exports = {

  /****************************************************************************
  *                                                                           *
  * Add custom action-reducer maps here, or override existing ones            *
  *                                                                           *
  ****************************************************************************/

  'user.current': {
    action: 'currentUser.fetch'
  },

  'permission.forCurrentUser': {
    action: 'currentUser.fetch'
  }

};
