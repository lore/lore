/* eslint no-param-reassign: "off" */

export { getConfig } from './getConfig';
export { getConnectionName } from './getConnectionName';

export function getConnectionMap(configOverride) {
  return getConfig(configOverride);
}
