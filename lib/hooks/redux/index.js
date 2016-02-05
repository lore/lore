var Redux = require('redux');
var thunk = require('redux-thunk');
var applyMiddleware = Redux.applyMiddleware;
var generateStore = require('./generateStore');

module.exports = {

  dependencies: ['reducers'],

  defaults: {
    redux: {
      middleware: [applyMiddleware(thunk)
      //devTools(),
      //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      ]
    }
  },

  load: function (lore) {
    if (!lore.reducers) {
      throw new Error('Error: lore.reducers does not exist. Must load hooks/reducers before hooks/redux');
    }
    lore.store = generateStore(lore.config.redux.middleware, lore.reducers);
  }

};