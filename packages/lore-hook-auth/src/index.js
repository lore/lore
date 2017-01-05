var _ = require('lodash');
var actionGenerator = require('./action');
var reducerGenerator = require('./reducer');

module.exports = {

  dependencies: ['models', 'actions', 'reducers', 'connect'],

  defaults: {
    auth: {
      modelName: null,
      actionName: null, // defaults to modelName
      reducerName:null // defaults to modelName
    }
  },

  load: function(lore) {
    var config = lore.config.auth;
    var modelName = config.modelName;
    var models = lore.models;
    var store = lore.store;

    if (!modelName) {
      throw new Error('lore-hook-auth requires a modelName be set in the config');
    }

    var actionName = config.actionName || modelName;
    var reducerName = config.reducerName || modelName;

    var action = actionGenerator(modelName, models);
    _.set(lore.actions, actionName, action);

    var reducer = reducerGenerator(modelName);
    _.set(lore.reducers, reducerName, reducer);

    _.set(lore.config.connect.reducerActionMap, reducerName, {
      action: actionName,
      blueprint: 'singleton'
    });
  }

};
