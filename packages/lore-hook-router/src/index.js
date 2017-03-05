var browserHistory = require('react-router').browserHistory;

module.exports = {

  dependencies: ['connect'],

  defaults: {
    router: {
      history: browserHistory,
      routes: function(lore) {
        return lore.loader.loadRoutes();
      }
    }
  },

  load: function(lore) {
    var config = lore.config.router;
    lore.router = {
      history: config.history,
      routes: config.routes(lore)
    }
  }

};
