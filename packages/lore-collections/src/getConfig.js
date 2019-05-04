/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { getConfig as getModelConfig } from '@lore/models';

export function getConfig(configOverride) {
  // return _.merge({
  //   models: getModelConfig(configOverride.models)
  // }, {
  //   collections: {
  //     defaultConnection: 'default',
  //     //apiRoot: 'https://api.example.com',
  //     //pluralize: true,
  //     //properties: {}
  //   }
  // }, configOverride);
  //
  return _.merge({},
    getModelConfig(configOverride.models),
    {
      default: {
        //apiRoot: 'https://api.example.com',
        //pluralize: true,
        //properties: {}
      }
    },
    configOverride
  );
}

export default getConfig;
