var redux = require('redux');
var bindActionCreators = redux.bindActionCreators;
var _ = require('lodash');

function bindAction(action, store) {
  return bindActionCreators(action, store.dispatch);
}

function bindActionsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    var action = actions[key];
    var boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0) {
      boundAction = bindActionsToActionCreators(action, store);
    } else {
      boundAction = bindAction(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

module.exports = {

  dependencies: ['actions', 'redux'],

  defaults: {},

  load: function(lore) {
    var actions = lore.actions;
    var store = lore.store;

    // Bind all actions to the store's dispatch method
    lore.actions = bindActionsToActionCreators(actions, store);
  }
};
