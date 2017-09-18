import _ from 'lodash';
import normalizeModel from './model';
import normalizeModels from './models';
import normalizeCollection from './collection';

export default function(lore, modelName) {
  const config = lore.loader.loadModels()[modelName];
  const Models = lore.models;
  const Collections = lore.collections;
  const shouldNormalize = lore.config.actions.normalize;
  const attributes = config.attributes || {};

  function normalize(actions, model) {
    // if normalization is disabled, bail out
    if (!shouldNormalize) return;

    // iterate over attributes in the model config, looking for any models that need to
    // be normalized
    _.mapKeys(attributes, function(attribute, attributeName) {
      if (
        attribute.type !== 'model' &&
        attribute.type !== 'models' &&
        attribute.type !== 'collection'
      ) {
        return;
      }

      // get the name and instance of the model we need to normalize the attribute to
      const normalizedModelName = attribute.model;

      // log an error if no model was specified
      if (!normalizedModelName) {
        console.error(`Attempted to normalize a [${modelName}] model but failed. No model name provided for the [${attributeName}] attribute`);
        return;
      }

      // get the model this attribute should be normalized to
      const NormalizedModel = Models[normalizedModelName];

      // log an error if the model doesn't exist
      if (!NormalizedModel) {
        console.error(`Attempted to normalize the [${attributeName}] for a [${modelName}] model but failed. No model exists named [${normalizedModelName}]`);
        return;
      }

      if (attribute.type === 'model') {
        normalizeModel(NormalizedModel, normalizedModelName, attributeName)(actions, model);
      }

      if (attribute.type === 'models') {
        normalizeModels(NormalizedModel, normalizedModelName, attributeName)(actions, model);
      }

      if (attribute.type === 'collection') {
        // get the name and instance of the model we need to normalize the attribute to
        const normalizedCollectionName = attribute.model || attribute.collection;

        // log an error if no model was specified
        if (!normalizedCollectionName) {
          console.error(`Attempted to normalize a [${modelName}] collection but failed. No collection name provided for the [${attributeName}] attribute`);
          return;
        }

        // get the model this attribute should be normalized to
        const NormalizedCollection = Collections[normalizedCollectionName];

        // log an error if the model doesn't exist
        if (!NormalizedCollection) {
          console.error(`Attempted to normalize the [${attributeName}] for a [${modelName}] collection but failed. No model exists named [${normalizedCollectionName}]`);
          return;
        }

        normalizeCollection(
          NormalizedCollection, normalizedCollectionName, attribute, attributeName
        )(actions, model);
      }
    });
  }

  return {
    model: function(model) {
      const actions = [];
      normalize(actions, model);
      return actions;
    },

    collection: function(collection) {
      const actions = [];
      collection.models.forEach(function(model) {
        normalize(actions, model);
      });
      return actions;
    }
  };
}
