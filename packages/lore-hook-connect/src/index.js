/* eslint no-param-reassign: "off" */

import connect from './connect';
import find from './blueprints/find';
import findAll from './blueprints/findAll';
import byId from './blueprints/byId';
import singleton from './blueprints/singleton';
import all from './blueprints/all';
import byCid from './blueprints/byCid';
import first from './blueprints/first';

import _connect from './decorators/connect';
import _getState from './helpers/getState';
import _Connect from './components/Connect';

export {
  _connect as connect,
  _getState as getState,
  _Connect as Connect
};

export default {

  dependencies: ['actions'],

  defaults: {
    connect: {
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
    }
  },

  load: function(lore) {
    const config = lore.config.connect;
    const actions = lore.actions;
    const reducerActionMap = config.reducerActionMap;
    const blueprints = config.blueprints;

    lore.connect = connect(actions, blueprints, reducerActionMap);
  }

};
