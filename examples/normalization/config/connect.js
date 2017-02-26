/**
 * Configuration file for connect
 *
 * This file is where you define overrides for the default connect behavior.
 */

module.exports = {

  /**
   * Extend or override the built-in blueprints. This is helpful if you want to
   * change the interface for 'lore.connect'. For example the default syntax to
   * fetch a model by id looks like this:
   *
   *   getState('tweet.byId', {
   *     id: 1
   *   })
   *
   * If you overrode the blueprint, you could modify the syntax to look like this
   * instead, to match the interface for the 'find' blueprint:
   *
   *   getState('tweet.find', {
   *     where: {
   *       id: 1
   *     }
   *   })
   *
   * While it's unlikely you'll need to override the blueprints
   */

  blueprints: {

    byId: {
      getPayload: function (reducerState, params) {
        var key = params.id;
        return reducerState[key];
      },

      callAction: function (action, params) {
        var id = params.id;
        var query = params.query;
        return action(id, query).payload;
      }
    }

  },

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

    // 'tweet.byId': {
    //   action: 'tweet.get',
    //   reducer: 'tweet.byId',
    //   blueprint: {
    //     getPayload: function (reducerState, params) {
    //       debugger
    //       var key = params.id;
    //       return reducerState[key];
    //     },
    //
    //     callAction: function (action, params) {
    //       debugger
    //       var id = params.id;
    //       return action(id).payload;
    //     }
    //   }
    // }

  }

};
