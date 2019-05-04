/* eslint no-param-reassign: "off" */

import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({
    defaultConnection: 'default',
    connectionMap: {
      default: []
    }
  }, configOverride);
}

export default getConfig;
