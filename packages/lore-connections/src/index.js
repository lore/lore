/* eslint no-param-reassign: "off" */

export { getConfig } from './getConfig';

export const getConnections = function(configOverride) {
  return getConfig(configOverride);
};
