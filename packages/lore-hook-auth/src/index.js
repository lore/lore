import _ from 'lodash';
import reducerGenerator from './reducer';
import get from './actions/get';
import update from './actions/update';

export default {

  dependencies: ['models', 'actions', 'reducers', 'connect'],

  defaults: {
    auth: {
      blueprints: {
        get,
        update
      },
      modelName: null,
      actionName: null, // defaults to modelName
      reducerName: null // defaults to modelName
    }
  },

  load: function(lore) {
    const config = lore.config.auth;
    const modelName = config.modelName;
    const models = lore.models;
    const blueprints = config.blueprints;

    if (!modelName) {
      throw new Error('lore-hook-auth requires a modelName be set in the config');
    }

    const actionName = config.actionName || modelName;
    const reducerName = config.reducerName || modelName;

    _.set(lore.actions, actionName, {
      get: blueprints.get(actionName, models, lore),
      update: blueprints.update(actionName, models, lore)
    });

    const reducer = reducerGenerator(modelName);
    _.set(lore.reducers, reducerName, reducer);

    _.set(lore.config.connect.reducerActionMap, reducerName, {
      action: `${actionName}.get`,
      reducer: reducerName,
      blueprint: 'singleton'
    });
  }

};
