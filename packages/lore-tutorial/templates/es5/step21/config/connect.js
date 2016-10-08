/**
 * Configuration file for connect
 *
 * This file is where you define overrides for the default connect behavior.
 */

module.exports = {

  /**
   * Add custom action-reducer maps here, or override existing ones
   */

  reducerActionMap: {

    // 'post.find': {
    //   action: 'post.find'
    // },
    //
    // 'post.byId': {
    //   action: 'post.get'
    // }

    'user.current': {
      action: 'currentUser.get'
    }

  }

};
