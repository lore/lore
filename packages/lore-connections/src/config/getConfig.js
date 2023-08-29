import _ from 'lodash';

export function getConfig(configOverride) {
  const connections = {

    /**
     * The set of connections, each representing a different API
     */

    default: {

      /**
       * The URL of the API server.
       *
       * If your API is behind server route like '/api', then make sure to include
       * that in url in the apiRoot (e.g. 'https://www.example.com/api')
       */

      apiRoot: 'https://api.example.com',

      /**
       * Pluralization setting used by the framework when composing API endpoints.
       *
       * Model names in Lore are singular, but many APIs used a plural convention
       * when making requests. Use this setting to tell the framework whether it
       * should convert your model names to a plural form when making API calls.
       *
       * Here is an example of how this setting would affect the endpoints for
       * a model named 'book':
       *
       * pluralize | endpoint
       * ---------------------------
       *   true    |  /books
       *   false   |  /book
       */

      pluralize: true,

      /**
       * Casing style used by the framework when composing API endpoints.
       *
       * Since models are camelCased in Lore, the framework assumed the server uses
       * camelCasing as well. For example, if you have a model called `bookAuthor`,
       * and pluralization is turned off, `the framework will assume the endpoint is
       * located at '/bookAuthor'. If the endpoint is something else, like '/book_author'
       * you will need to tell the framework to modify its convention.
       *
       * casingStyle |  endpoint
       * ---------------------------
       *   snake     |  /book_author
       *   kebab     |  /book-author
       *   camel     |  /bookAuthor
       *   pascal    |  /BookAuthor
       */

      casingStyle: 'camel',

      /**
       * Headers that should be applied to all network requests.
       *
       * This function will be called before every network request, and any
       * keys you provide will be added as a header in the network request.
       *
       * A common use would be sending an authorization token with each request:
       *
       * headers: function() {
       *   return {
       *     Authorization: 'JWT <token>'
       *   };
       * }
       */

      // headers: function() {
      //   return {};
      // }

    },

    /**
     * You can configure additional APIs by providing a unique key and defining
     * the relevant properties. The 'connectionMap' config will allow you to
     * specify which models belong to which API.
     */

    // v2: {
    //   apiRoot: 'https://api.example.com',
    //
    //   headers: function() {
    //     return {};
    //   }
    // }

  };

  /**
   * The set of connections, each representing a different API
   */

  const config = _.merge({
    default: {}
  }, configOverride);

  /**
   * Map the default connection data onto each connection
   */

  _.mapKeys(config, function(data, connectionName) {
    config[connectionName] = _.extend({}, connections.default, data);
  });

  return config;
}

export default getConfig;
