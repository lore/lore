/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import find from './blueprints/find';
import findAll from './blueprints/findAll';
import byId from './blueprints/byId';
import singleton from './blueprints/singleton';
import all from './blueprints/all';
import byCid from './blueprints/byCid';
import first from './blueprints/first';

export function getConfig(configOverride) {
  return _.merge({
    blueprints: {
      all,
      byCid,
      byId,
      find,
      findAll,
      first,
      singleton
    },
    reducerActionMap: {
      '*.all': {
        action: null,
        reducer: '*.byCid',
        blueprint: 'all'
      },
      '*.byCid': {
        action: null,
        reducer: '*.byCid',
        blueprint: 'byCid'
      },
      '*.byId': {
        action: '*.get',
        reducer: '*.byId',
        blueprint: 'byId'
      },
      '*.find': {
        action: '*.find',
        reducer: '*.find',
        blueprint: 'find'
      },
      '*.findAll': {
        action: '*.find',
        reducer: '*.find',
        blueprint: 'findAll'
      },
      '*.first': {
        action: '*.find',
        reducer: '*.find',
        blueprint: 'first'
      }
    }
  }, configOverride);
}

export default getConfig;
