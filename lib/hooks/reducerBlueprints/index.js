var reducer = require('./reducer');

module.exports = {

  dependencies: ['models'],

  load: function (lore) {
    lore.reducers = lore.reducers || {};
    Object.keys(lore.models).forEach(function (modelName) {
      lore.reducers[modelName] = lore.reducers[modelName] || reducer(modelName);
    });
  }

};