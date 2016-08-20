var _ = require('lodash');
var redux = require('redux');
var bindActionCreators = redux.bindActionCreators;
var blueprints = {
  subscribe: require('./blueprints/subscribe')
};

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

  dependencies: ['models', 'collections', 'redux'],

  load: function(lore) {
    var models = lore.models;
    var collections = lore.collections;
    var store = lore.store;
    var actions = {};

    // todo: should actions be created for files in /collections
    // that have no corresponding model in /models Currently
    // this only creates 'subscribe' actions for things in /models

    Object.keys(models).forEach(function(modelName) {
      actions[modelName] = actions[modelName] || {};
      _.assign(actions[modelName], {
        subscribe: blueprints.subscribe(modelName, models)
      })
    });

    // Bind all actions to the store's dispatch method
    lore.websockets = bindActionsToActionCreators(actions, store);
  }
};
