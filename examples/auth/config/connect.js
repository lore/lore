/**
 * Configuration file for connect
 *
 * This file is where you define overrides for the default connect behavior.
 */

module.exports = {

  /**
   * Add custom reducer-action maps here, or override existing ones
   *
   * This map determines what action gets called when the requested
   * reducer state does not exist. The blueprint is responsible for:
   *
   * 1. Validating the parameters passed to the getState method
   * 2. Extracting the desired state from the Redux Store
   * 3. Calling the action if that state does not exist
   */

  reducerActionMap: {

    'user.current': {
      action: 'currentUser.fetch',
      blueprint: 'singleton'
    },

    'permission.forCurrentUser': {
      action: 'currentUser.fetch',
      blueprint: 'singleton'
    }

    /**
     * There are three blueprints built into the framework, with mappings
     * that look like this. These are examples of the mappings automatically
     * created by the framework based on conventions.
     *
     * You can reuse built-in blueprints by setting the value of blueprint
     * to the name of the blueprint you want to reuse.
     */

    // 'post.find': {
    //   action: 'post.find',
    //   reducer: 'post.find',
    //   blueprint: 'find'
    // },
    //
    // 'post.byId': {
    //   action: 'post.get',
    //   reducer: 'post.byId',
    //   blueprint: 'byId'
    // },
    //
    // 'currentUser': {
    //   action: 'currentUser',
    //   reducer: 'currentUser',
    //   blueprint: 'singleton'
    // },

    /**
     * If the built-in blueprints don't work for you, you can use a custom
     * blueprint by providing an object as the value of the blueprint. The
     * code below mimics the built-in singleton blueprint.
     */

    // 'currentUser': {
    //   action: 'currentUser',
    //   reducer: 'currentUser',
    //   blueprint: {
    //     getPayload: function(reducerState, params) {
    //       return reducerState;
    //     },
    //
    //     callAction: function(action, params) {
    //       return action().payload;
    //     }
    //   }
    // }

  }

};
