import _ from 'lodash';
import { getNormalizer } from '@lore/normalize';

export function getActions(config={}, resources={}, modules={}) {
  const {
    actions: {
      blueprints: _blueprints,
      normalize: _normalize,
      addCidToBody: _addCidToBody,
      cidBodyAttributeName: _cidBodyAttributeName
    }
  } = config;

  const { models, collections } = resources;

  /*
   * Generate default set of actions for all models using blueprints
   *
   * Note that this only creates actions for files in /collections
   * that have a corresponding model in /models
   */

  const actions = _.mapValues(models, function(Model, modelName) {
    const Collection = collections[modelName];

    const normalizer = getNormalizer(modelName, {
      models: models,
      collections: collections,
      normalize: _normalize,
      attributes: modules.models[modelName].attributes
    });

    return {
      create: _blueprints.create(modelName, Model, {
        addCidToBody: _addCidToBody,
        cidBodyAttributeName: _cidBodyAttributeName,
        normalizer
      }),
      destroy: _blueprints.destroy(modelName, Model, {
        normalizer
      }),
      get: _blueprints.get(modelName, Model, {
        normalizer
      }),
      find: _blueprints.find(modelName, Collection, {
        normalizer
      }),
      refetch: _blueprints.refetch(modelName, Collection, {
        normalizer
      }),
      update: _blueprints.update(modelName, Model, {
        normalizer
      })
    };
  });

  /*
   * Include any custom actions defined in src/actions and, when
   * the name matches one of the blueprints, use the custom
   * implementation instead
   */

  return _.defaultsDeep({}, modules.actions, actions);
}
