var _ = require('lodash');
var sinon = require('sinon');

// The loaders we're stubbing out
var loaders = {
  actions: require('../../src/loaders/actions'),
  collections: require('../../src/loaders/collections'),
  config: require('../../src/loaders/config'),
  models: require('../../src/loaders/models'),
  reducers: require('../../src/loaders/reducers'),
  userHooks: require('../../src/loaders/userHooks'),
  initializers: require('../../src/loaders/initializers')
};

function LoaderHelper() {

}

_.extend(LoaderHelper.prototype, {

  // Stub everything out - blank canvas, nothing gets loaded or exists
  init: function() {
    var emptyStubs = _.reduce(loaders, function(stubs, value, loaderName) {
      stubs[loaderName] = {};
      return stubs;
    }, {});
    this.stub(emptyStubs);
  },

  // Stub out the loaders with the provided response
  stub: function(stubs) {
    _.mapKeys(stubs, function(loaderResponse, loaderName) {
      var loader = loaders[loaderName];

      if (!loader) {
        throw new Error('No loader found with the name ' + loaderName);
      }

      if (loader.load.restore) {
        loader.load.restore();
      }

      sinon.stub(loader, 'load', function() {
        return loaderResponse;
      });
    });
  },

  // Restore all stubs back to the real files
  restore: function() {
    _.keys(loaders, function(loaderName) {
      var loader = loaders[loaderName];

      if (loader.load.restore) {
        loader.load.restore();
      }
    });
  }

});

module.exports = new LoaderHelper();
