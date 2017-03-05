var _ = require('lodash');
var actionBlueprints = require('lore-actions').blueprints;
var utils = require('lore-actions').utils;

function convertBlueprintToActionCreator(action, store) {
  // if the module isn't a function, then it's an object describing the action
  // config and needs to be converted to a real function
  if(!_.isFunction(action)){
    action = actionBlueprints[action.blueprint](action);
  }

  return action;
}

function convertBlueprintsToActionCreators(actions, store) {
  Object.keys(actions).forEach(function(key) {
    var action = actions[key];
    var boundAction = null;
    if (_.isPlainObject(action) && Object.keys(action).length > 0 && Object.keys(action).indexOf('blueprint') < 0) {
      boundAction = convertBlueprintsToActionCreators(action, store);
    } else {
      boundAction = convertBlueprintToActionCreator(action, store);
    }
    actions[key] = boundAction;
  });
  return actions;
}

module.exports = {

  dependencies: ['models', 'collections'],

  defaults: {
    actions: {
      normalize: true,
      addCidToBody: false,
      cidBodyAttributeName: 'cid',
      blueprints: {
        create: require('./blueprints/create'),
        destroy: require('./blueprints/destroy'),
        get: require('./blueprints/get'),
        find: require('./blueprints/find'),
        update: require('./blueprints/update')
      }
    }
  },

  load: function(lore) {
    lore.actions = lore.actions || {};
    var models = lore.models;
    var collections = lore.collections;
    var store = lore.store;
    var actions = lore.loader.loadActions();
    var config = lore.config.actions;
    var blueprints = config.blueprints;

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
      })
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
