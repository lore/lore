/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import get from './actions/get';
import update from './actions/update';

export function getConfig(configOverride) {
  const config = _.merge({
    blueprints: {
      get,
      update
    },
    modelName: null,
    actionName: null, // defaults to modelName
    reducerName: null // defaults to modelName
  }, configOverride);

  config.modelName = config.modelName || 'currentUser';
  config.actionName = config.actionName || config.modelName;
  config.reducerName = config.reducerName || config.modelName;

  return config;
}

export default getConfig;
