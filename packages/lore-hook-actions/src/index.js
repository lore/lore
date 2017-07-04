/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { utils, blueprints as actionBlueprints } from 'lore-actions';

// blueprints
import create from './blueprints/create';
import destroy from './blueprints/destroy';
import get from './blueprints/get';
import find from './blueprints/find';
import update from './blueprints/update';

function convertBlueprintToActionCreator(action, store) {
  // if the module isn't a function, then it's an object describing the action
  // config and needs to be converted to a real function
  if (!_.isFunction(action)) {
    action = actionBlueprints[action.blueprint](action);
  }

  return action;
}

function convertBlueprintsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    const action = actions[key];
    let boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0 && Object.keys(action).indexOf('blueprint') < 0) {
      boundAction = convertBlueprintsToActionCreators(action, store);
    } else {
      boundAction = convertBlueprintToActionCreator(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

export default {

  dependencies: ['models', 'collections'],

  defaults: {
    actions: {
      normalize: true,
      addCidToBody: false,
      cidBodyAttributeName: 'cid',
      blueprints: {
        create,
        destroy,
        get,
        find,
        update
      }
    }
  },

  load: function(lore) {
    lore.actions = lore.actions || {};
    const models = lore.models;
    const collections = lore.collections;
    const store = lore.store;
    const config = lore.config.actions;
    const blueprints = config.blueprints;
    let actions = lore.loader.loadActions();

    // todo: should actions be created for files in /collections
    // that have no corresponding model in /models Currently
    // this only creates 'find' actions for things in /models

    Object.keys(models).forEach(function(modelName) {
      lore.actions[modelName] = lore.actions[modelName] || {};
      _.assign(lore.actions[modelName], {
        create: blueprints.create(modelName, models, config),
        destroy: blueprints.destroy(modelName, models),
        get: blueprints.get(modelName, models, lore),
        find: blueprints.find(modelName, collections, lore),
        update: blueprints.update(modelName, models)
      });
    });

    // overwrite any blueprints with custom implementations
    actions = _.defaultsDeep({}, actions, lore.actions);

    // Bind all actions to the store's dispatch method
    lore.actions = convertBlueprintsToActionCreators(actions, store);

    lore.utils = lore.utils || {};
    lore.utils.payload = utils.payload;
    lore.utils.payloadCollection = utils.payloadCollection;
  }
};
