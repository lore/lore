var redux = require('redux');
var _ = require('lodash');
var bindActionCreators = redux.bindActionCreators;
var actionBlueprints = require('lore-actions').blueprints;
var utils = require('lore-actions').utils;

function bindAction(action, store) {
  // if the module isn't a function, then it's an object describing the action
  // config and needs to be converted to a real function
  if(!_.isFunction(action)){
    action = actionBlueprints[action.blueprint](action);
  }

  return bindActionCreators(action, store.dispatch);
}

function bindActionsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    var action = actions[key];
    var boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0 && Object.keys(action).indexOf('blueprint') < 0) {
      boundAction = bindActionsToActionCreators(action, store);
    } else {
      boundAction = bindAction(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

module.exports = {

  dependencies: ['redux', 'action-blueprints'],

  load: function(lore) {
    var store = lore.store;
    var actions = lore.loader.loadActions();

    // overwrite any blueprints with custom implementations
    actions = _.defaultsDeep({}, actions, lore.actions);

    // Bind all actions to the store's dispatch method
    lore.actions = bindActionsToActionCreators(actions, store);

    lore.utils = lore.utils || {};
    lore.utils.payload = utils.payload;
    lore.utils.payloadCollection = utils.payloadCollection;
  }
};
