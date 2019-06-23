import _ from 'lodash';
import buildDictionary from 'webpack-requiredir';
import { reducerGenerator } from '@lore/auth';
import { getNormalizer } from '@lore/normalize';

const modules = {
  models: buildDictionary(require.context('../src/models', false, /\.js$/))
};

export default function(config, { models, collections, actions, reducers }) {
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

  reducers[_reducerName] = getUserReducer(config);
  actions[_actionName] = getUserActions(config, { models, collections });
  _reducerActionMap[_modelName] = getUserReducerActionMapEntry(config);
};

export function getUserActions(config, { models, collections }) {
  const {
    actions: {
      normalize: _normalize
    },
    auth: {
      modelName: _modelName,
      blueprints: _blueprints,
    }
  } = config;

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

export function getUserReducer(config) {
  const {
    auth: {
      modelName: _modelName
    }
  } = config;

  return reducerGenerator(_modelName);
}

export function getUserReducerActionMapEntry(config) {
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

