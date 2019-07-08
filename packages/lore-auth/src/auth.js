import { getNormalizer } from '@lore/normalize';
import { reducerGenerator } from './reducer';

export default function(config={}, resources={}, modules={}) {
  const {
    auth: {
      modelName: _modelName,
      actionName: _actionName,
      reducerName: _reducerName
    },
    connect: {
      reducerActionMap: _reducerActionMap
    }
  } = config;

  const { models, collections, actions, reducers } = resources;

  /**
   * Long-form for pasting into scripts
   */

  // reducers[config.auth.reducerName] = getUserReducer(config);
  // actions[config.auth.actionName] = getUserActions(config, { models, collections }, modules);
  // config.connect.reducerActionMap[config.auth.modelName] = getUserReducerActionMapEntry(config);

  reducers[_reducerName] = getUserReducer(config);
  actions[_actionName] = getUserActions(config, { models, collections }, {
    models: modules.models
  });
  _reducerActionMap[_modelName] = getUserReducerActionMapEntry(config);
};

export function getUserActions(config={}, resources={}, modules={}) {
  const {
    actions: {
      normalize: _normalize
    },
    auth: {
      modelName: _modelName,
      blueprints: _blueprints,
    }
  } = config;

  const { models, collections } = resources;

  const Model = models[_modelName];

  const normalizer = getNormalizer(_modelName, {
    models: models,
    collections: collections,
    normalize: _normalize,
    attributes: modules.models[_modelName].attributes
  });

  return {
    get: _blueprints.get(_modelName, Model, {
      normalizer
    }),
    update: _blueprints.update(_modelName, Model, {
      normalizer
    })
  };
}

export function getUserReducer(config={}) {
  const {
    auth: {
      modelName: _modelName
    }
  } = config;

  return reducerGenerator(_modelName);
}

export function getUserReducerActionMapEntry(config={}) {
  const {
    auth: {
      actionName: _actionName,
      reducerName: _reducerName
    }
  } = config;

  return {
    action: `${_actionName}.get`,
    reducer: _reducerName,
    blueprint: 'singleton'
  };
}

