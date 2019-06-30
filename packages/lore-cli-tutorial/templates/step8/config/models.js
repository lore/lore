/**
 * Configuration file for models
 *
 * This file is where you define overrides for the default model behaviors.
 * Settings here apply to all models, and some are inherited by collections.
 */

export default {

  /****************************************************************************
  *                                                                           *
  * The URL of your API server. If you have multiple API servers, set the     *
  * primary server here and override this property in the models that use     *
  * a different server.                                                       *
  *                                                                           *
  * Collections inherit this property.                                        *
  *                                                                           *
  ****************************************************************************/

  apiRoot: 'http://localhost:1337',

  /****************************************************************************
  *                                                                           *
  * If pluralize is true, all model names will be converted to their plural   *
  * form when making API calls. A model called 'foo' will made a call to      *
  * '/foos' if pluralize is true, and to '/foo' if pluralize is false         *
  * Uses the pluralize.js library to determine the plural model name          *
  * See: https://github.com/blakeembrey/pluralize                             *
  *                                                                           *
  * Collections inherit this property.                                        *
  *                                                                           *
  ****************************************************************************/

  // pluralize: true,

  /****************************************************************************
  *                                                                           *
  * Define properties that should apply to all models here.                   *
  * You can override all of these methods on a per-model basis.               *
  *                                                                           *
  ****************************************************************************/

  properties: {

    /**
     * Generate a UUID to support optimistic websocket updates
     */

    // generateCid: function() {
    //   return uuid.v4();
    // },

    /**
     * Headers that should be applied to all network requests
     */

    // headers: function() {
    //   return {
    //     'Authorization': 'Bearer xyz'
    //   };
    // }

    /**
     * Use this function to transform the server response before using it
     * in the application (such as adding, removing or changing properties)
     */

    // parse: function(attributes) {
    //   return attributes;
    // }

  }

}
