import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({
    default: {

      //apiRoot: 'https://api.example.com',

      //pluralize: true,

      properties: {

        /**
         * Use this function to transform the server response before using it
         * in the application (such as adding, removing or modifying properties)
         *
         * This method only gets called when making a request to a collection endpoint
         * like '/books'. Once it completes, each resource in the response will
         * automatically be processed by the parse method of the corresponding model.
         */

        // parse: function(response) {
        //   return response;
        // }

      }

    }
  }, configOverride);
}

export default getConfig;
