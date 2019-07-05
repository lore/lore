import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * The default API connection that models should use if they have no explicit mapping.
     */

    defaultConnection: 'default',

    /**
     * If your application interacts with multiple APIs, create a connection for each
     * API and then define which models are associated with each connection here.
     *
     * Here is an example for an application with a versioned API (v1 and v2):
     *
     * {
     *   v1: [
     *     'currentUser',
     *     'author'
     *   ],
     *   v2: [
     *     'book',
     *     'publisher'
     *   ]
     * }
     */

    connectionMap: {
      default: []
    }

  }, configOverride);
}

export default getConfig;
