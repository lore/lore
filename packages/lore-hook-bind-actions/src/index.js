/* eslint no-param-reassign: "off" */

import { bindActionCreators } from 'redux';
import _ from 'lodash';

function bindAction(action, store) {
  return bindActionCreators(action, store.dispatch);
}

function bindActionsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    const action = actions[key];
    let boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0) {
      boundAction = bindActionsToActionCreators(action, store);
    } else {
      boundAction = bindAction(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

export default {

  dependencies: ['actions', 'redux'],

  defaults: {},

  load: function(lore) {
    const actions = lore.actions;
    const store = lore.store;

    // Save a copy of the unbound actions
    lore._actions = _.cloneDeep(actions);

    // Bind all actions to the store's dispatch method
    lore.actions = bindActionsToActionCreators(actions, store);
  }
};
