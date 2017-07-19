/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import subscribe from './blueprints/subscribe';

const blueprints = {
  subscribe: subscribe
};

function bindAction(action, store) {
  // if the module isn't a function, then it's an object describing the action
  // config and needs to be converted to a real function
  if (!_.isFunction(action)) {
    action = blueprints[action.blueprint](action);
  }

  return bindActionCreators(action, store.dispatch);
}

function bindActionsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    const action = actions[key];
    let boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0 && Object.keys(action).indexOf('blueprint') < 0) {
      boundAction = bindActionsToActionCreators(action, store);
    } else {
      boundAction = bindAction(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

export default {

  dependencies: ['models', 'collections', 'redux'],

  load: function(lore) {
    const models = lore.models;
    // const collections = lore.collections;
    const store = lore.store;
    const actions = {};

    // todo: should actions be created for files in /collections
    // that have no corresponding model in /models Currently
    // this only creates 'subscribe' actions for things in /models

    Object.keys(models).forEach(function(modelName) {
      actions[modelName] = actions[modelName] || {};
      _.assign(actions[modelName], {
        subscribe: blueprints.subscribe(modelName, models)
      });
    });

    // Bind all actions to the store's dispatch method
    lore.websockets = bindActionsToActionCreators(actions, store);
  }
};
