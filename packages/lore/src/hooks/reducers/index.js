var _ = require('lodash');

module.exports = {

  dependencies: ['reducerBlueprints'],

  load: function(lore) {
    var reducers = lore.loader.loadReducers();
    // overwrite any blueprints with custom implementations
    lore.reducers = _.defaultsDeep({}, reducers, lore.reducers);
  }

};
