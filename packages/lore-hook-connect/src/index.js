var connect = require('./connect');

module.exports = {

  dependencies: ['actions'],

  defaults: {
    connect: {
      blueprints: {
        find: require('./blueprints/find'),
        byId: require('./blueprints/byId'),
        singleton: require('./blueprints/singleton')
      },
      reducerActionMap: {}
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
