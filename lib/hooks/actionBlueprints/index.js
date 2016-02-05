var _ = require('lodash');
var blueprints = {
  create: require('./blueprints/create'),
  destroy: require('./blueprints/destroy'),
  fetch: require('./blueprints/fetch'),
  fetchAll: require('./blueprints/fetchAll'),
  update: require('./blueprints/update')
};

module.exports = {

  dependencies: ['models', 'collections'],

  load: function (lore) {
    var models = lore.models;
    var collections = lore.collections;

    // todo: should actions be created for files in /collections
    // that have no corresponding model in /models Currently
    // this only creates fetchAll actions for things in /models

    Object.keys(models).forEach(function (modelName) {
      lore.actions = lore.actions || {};
      lore.actions[modelName] = lore.actions[modelName] || {};
      _.assign(lore.actions[modelName], {
        create: blueprints.create(modelName, models),
        destroy: blueprints.destroy(modelName, models),
        fetch: blueprints.fetch(modelName, models),
        fetchAll: blueprints.fetchAll(modelName, collections),
        update: blueprints.update(modelName, models)
      });
    });
  }
};