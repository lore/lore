/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import find from '../queries/find';
import get from '../queries/get';
import create from '../mutations/create';
import destroy from '../mutations/destroy';
import update from '../mutations/update';

export function getConfig(configOverride) {
  return _.merge({
    endpoint: '',
    queries: {
      find,
      get
    },
    mutations: {
      create,
      destroy,
      update
    },
  }, configOverride);
}

export default getConfig;
