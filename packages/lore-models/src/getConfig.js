/* eslint no-param-reassign: "off" */

import _ from 'lodash';

export function getConfig(configOverride) {
  return _.merge({
    default: {
      properties: {}
    }
  }, configOverride);
}

export default getConfig;
