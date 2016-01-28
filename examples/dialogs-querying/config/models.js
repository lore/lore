/**
 * Configuration file for models-collections
 */

module.exports = {

  /****************************************************************************
  *                                                                           *
  * Define properties that should apply to all collections here. Since we     *
  * only lightly wrapping Backbone, you can define any properties here that   *
  * Backbone supports for Collections.                                        *
  *                                                                           *
  ****************************************************************************/

  apiRoot: 'https://api.example.com',

  /****************************************************************************
   *                                                                           *
   * If pluralize is true, all model names will be converted to their plural   *
   * form when making API calls. A model called 'foo' will made a call to      *
   * '/foos' if pluralize is true, and to '/foo' if pluralize is false         *
   * Uses the pluralize.js library to determine the plural model name          *
   * See: https://github.com/blakeembrey/pluralize                             *
   *                                                                           *
   ****************************************************************************/

   pluralize: true,

  /****************************************************************************
  *                                                                           *
  * Define properties that should apply to all models here. Since we are      *
  * only lightly wrapping Backbone, you can define any properties here that   *
  * Backbone supports for Models.                                             *
  * See: http://backbonejs.org/#Model                                         *
  *                                                                           *
  ****************************************************************************/

  properties: {

    //
    // See http://backbonejs.org/#Model-parse
    //
    parse: function(attributes) {
      return attributes;
    }

  }

};
