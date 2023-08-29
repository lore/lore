import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * Define properties that should apply to all models here.
     * You can override all of these methods on a per-model basis.
     */

    default: {

      properties: {

        /**
         * Use this function to control how the client id (cid) of each model
         * is generated.
         *
         * By default all models have a cid that looks like 'c1', 'c2', etc.
         * This cid is required to support optimistic updates against a REST API,
         * and the format is intentionally concise in order to make it easy for
         * developers to read and remember (mostly for debugging purposes).
         *
         * When your application integrates support for WebSockets though, this
         * cid format is no longer sufficient, as supporting optimistic updates
         * requires sending the cid to the API server, which requires it to be
         * globally unique.
         *
         * This function exists so that you can modify the unique id and convert
         * it to a UUID when required. A good library to do that can be found here:
         * https://github.com/kelektiv/node-uuid
         */

        // generateCid: function() {
        //   return _.uniqueId('c');
        // },

        /**
         * Use this function to transform the server response before using it
         * in the application (such as adding, removing or modifying properties)
         */

        // parse: function(response) {
        //   return response;
        // }

      }

    },

    /**
     * You can configure additional APIs by providing a unique key and defining
     * the relevant properties. The 'connectionMap' config will allow you to
     * specify which models belong to which API.
     */

    // v2: {
    //   properties: {
    //     generateCid: function() {
    //       return _.uniqueId('c');
    //     },
    //     parse: function(response) {
    //       return response;
    //     }
    //   }
    // }

  }, configOverride);
}

export default getConfig;
