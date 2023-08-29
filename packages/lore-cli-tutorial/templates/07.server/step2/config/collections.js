/**
 * Configuration file for collections
 *
 * This file is where you define overrides for the default collection behaviors.
 */

import { getConfig } from '@lore/collections';

export default getConfig({

  /**
   * Define properties that should apply to all collections here.
   * You can override all of these methods on a per-collection basis.
   */

  default: {

    properties: {

      /**
       * Use this function to transform the server response before using it
       * in the application (such as adding, removing or modifying properties)
       *
       * This method only gets called when making a request to a collection endpoint
       * like '/books'. Once it completes, each resource in the response will
       * automatically be processed by the parse method of the corresponding model.
       */

      parse: function(response) {
        return response.data;
      }

    }

  },

  /**
   * You can configure additional APIs by providing a unique key and defining
   * the relevant properties. The 'connectionMap' config will allow you to
   * specify which collections belong to which API.
   */

  // v2: {
  //   properties: {
  //     parse: function(response) {
  //       return response;
  //     }
  //   }
  // }

})
