/* eslint no-param-reassign: "off" */

export { getConfig } from './getConfig';

export const getConnectionMap = function(configOverride) {
  return getConfig(configOverride);
};
