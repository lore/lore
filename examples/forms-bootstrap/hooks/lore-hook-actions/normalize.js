var _ = require('lodash');
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;

module.exports = function(lore, modelName) {
  var config = lore.loader.loadModels()[modelName];
  var Models = lore.models;
  var shouldNormalize = lore.config.actions.normalize;
  var attributes = config.attributes || {};

  function normalize(actions, model) {
    // if normalization is disabled, bail out
    if (!shouldNormalize) return;

    // iterate over attributes in the model config, looking for any models that need to be normalized
    _.mapKeys(attributes, function(attribute, attributeName) {

      // if the attribute type isn't a model, we don't care, so bail out
      if (attribute.type !== 'model') return;

      // get the data we need to inspect for normalization
      var data = model.attributes[attributeName];

      // if the data is NOT a plain object, we can't normalize it, so bail out
      if (!_.isPlainObject(data)) return;

      // get the name and instance of the model we need to normalize the attribute to
      var normalizedModelName = attribute.model;

      // log an error if no model was specified
      if (!normalizedModelName) {
        console.error('Attempted to normalize a [' + modelName + '] model but failed. No model name provided for the [' + attributeName + '] attribute');
        return;
      }

      // get the model this attribute should be normalized to
      var NormalizedModel = Models[normalizedModelName];

      // log an error if the model doesn't exist
      if (!NormalizedModel) {
        console.error('Attempted to normalize the [' + attributeName + '] for a [' + modelName + '] model but failed. No model exists named [' + normalizedModelName + ']');
        return;
      }

      // create an instance of the normalized model populated with the nested data
      var normalizedModel = new NormalizedModel(data);

      // replace the attribute with it's normalized form (a reference to the id)
      model.set(attributeName, normalizedModel.id);

      // add an action to be dispatched
      actions.push({
        type: ActionTypes.update(normalizedModelName),
        payload: payload(normalizedModel, PayloadStates.RESOLVED)
      });
    })
  }

  return {
    model: function(model) {
      var actions = [];
      normalize(actions, model);
      return actions;
    },

    collection: function(collection) {
      var actions = [];
      collection.models.forEach(function(model){
        normalize(actions, model);
      });
      return actions;
    }
  }
};
