import _ from 'lodash';
import actionGenerator from './action';
import reducerGenerator from './reducer';

export default {

  dependencies: ['models', 'actions', 'reducers', 'connect'],

  defaults: {
    auth: {
      modelName: null,
      actionName: null, // defaults to modelName
      reducerName: null // defaults to modelName
    }
  },

  load: function(lore) {
    const config = lore.config.auth;
    const modelName = config.modelName;
    const models = lore.models;

    if (!modelName) {
      throw new Error('lore-hook-auth requires a modelName be set in the config');
    }

    const actionName = config.actionName || modelName;
    const reducerName = config.reducerName || modelName;

    const action = actionGenerator(modelName, models);
    _.set(lore.actions, actionName, action);

    const reducer = reducerGenerator(modelName);
    _.set(lore.reducers, reducerName, reducer);

    _.set(lore.config.connect.reducerActionMap, reducerName, {
      action: actionName,
      reducer: reducerName,
      blueprint: 'singleton'
    });
  }

};
