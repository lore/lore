/**
 * Configuration file for collections
 *
 * This file is where you define overrides for the default collection behaviors.
 */

module.exports = {

  /****************************************************************************
  *                                                                           *
  * Define properties that should apply to all collections here.              *
  * You can override all of these methods on a per-collection basis.          *
  *                                                                           *
  ****************************************************************************/

  properties: {

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

};
