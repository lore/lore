/* eslint no-param-reassign: "off" */

import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({

    /**
     * Blueprints are used to provide models with a default set of reducers for
     * storing data. If you want to modify the behavior of those reducers you
     * can provide your own implementation here.
     */

    serverUrl: 'https://websockets.example.com',

    // namespace: '',

    // event: '',

    pluralize: true

  }, configOverride);
}

export default getConfig;
