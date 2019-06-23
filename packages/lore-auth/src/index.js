import _ from 'lodash';
import reducerGenerator from './reducer';
import get from './actions/get';
import update from './actions/update';

export { UserContext } from './UserContext';
export { useUser } from './hooks/useUser';
export { getConfig } from './getConfig';

export { reducerGenerator };

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
      throw new Error('@lore/auth requires a modelName be set in the config');
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

export function getUserActions(configOverride, models) {
  const config = getConfig(configOverride);

  const modelName = config.modelName;
  const blueprints = config.blueprints;

  if (!modelName) {
    throw new Error('@lore/auth requires a modelName be set in the config');
  }

  const actionName = config.actionName || modelName;

  _.set(lore.actions, actionName, {
    get: blueprints.get(actionName, models, lore),
    update: blueprints.update(actionName, models, lore)
  });
}

export function getUserReducer(configOverride, models) {
  const config = getConfig(configOverride);

  const modelName = config.modelName;

  if (!modelName) {
    throw new Error('@lore/auth requires a modelName be set in the config');
  }

  const reducerName = config.reducerName || modelName;

  const reducer = reducerGenerator(modelName);
  _.set(lore.reducers, reducerName, reducer);
}

export function updateReducerActionMap(configOverride, reducerActionMap) {
  const config = getConfig(configOverride);

  const modelName = config.modelName;

  if (!modelName) {
    throw new Error('@lore/auth requires a modelName be set in the config');
  }

  const actionName = config.actionName || modelName;
  const reducerName = config.reducerName || modelName;

  _.set(reducerActionMap, reducerName, {
    action: `${actionName}.get`,
    reducer: reducerName,
    blueprint: 'singleton'
  });

  return reducerActionMap;
}
