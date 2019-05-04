/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import create from './blueprints/create';
import destroy from './blueprints/destroy';
import get from './blueprints/get';
import find from './blueprints/find';
import refetch from './blueprints/refetch';
import update from './blueprints/update';

export function getConfig(configOverride) {
  return _.merge({
    normalize: true,
    addCidToBody: false,
    cidBodyAttributeName: 'cid',
    blueprints: {
      create,
      destroy,
      get,
      find,
      refetch,
      update
    }
  }, configOverride);
}

export default getConfig;
