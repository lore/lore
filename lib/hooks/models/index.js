var LoreModels = require('../../../packages/lore-models');
var _ = require('lodash');
var generateProperties = require('./generateProperties');

module.exports = {

  defaults: {
    models: {
      apiRoot: 'https://api.example.com',
      pluralize: true,
      properties: {}
    }
  },

  load: function (lore) {
    var models = lore.loader.loadModels();
    var config = lore.config.models;
    lore.models = {};

    _.mapKeys(models, function (module, moduleName) {
      // todo: currently setting the modelName to the filename, but
      // should change to be PascalCase, like lore.models.ModelName
      var modelName = moduleName;

      // Cascaded series of defaults to define the models final properties
      // 1. Start from anything the user defined in the collections's config
      // 2. Add any missing application level settings from config.models
      // 2. Add any missing settings from conventions
      var properties = generateProperties(modelName, {
        config: config,
        definition: module
      });

      lore.models[modelName] = LoreModels.Model.extend(properties);
    });
  }

};