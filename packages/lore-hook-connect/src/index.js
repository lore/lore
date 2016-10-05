var connect = require('./connect');

module.exports = {

  dependencies: ['actions'],

  defaults: {
    connect: {
      reducerActionMap: {}
    }
  },

  load: function(lore) {
    lore.connect = connect(lore);
  }

};
