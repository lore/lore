var connect = require('./connect');

module.exports = {

  dependencies: ['actions'],

  defaults: {
    connect: {
      blueprints: {
        find: require('./blueprints/find'),
        byId: require('./blueprints/byId'),
        singleton: require('./blueprints/singleton'),
        all: require('./blueprints/all'),
        byCid: require('./blueprints/byCid')
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
        }
      }
    }
  },

  load: function(lore) {
    var config = lore.config.connect;
    var actions = lore.actions;
    var reducerActionMap = config.reducerActionMap;
    var blueprints = config.blueprints;

    lore.connect = connect(actions, blueprints, reducerActionMap);
  }

};
