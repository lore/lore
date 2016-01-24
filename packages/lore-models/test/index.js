const Backbone = require('backbone');
Backbone.sync = require('backbone-super-sync');

const expect = require('chai').expect;
const nock = require('nock');

const loreModelsCollections = require('../src/index');

const API_ROOT = 'https://example.com';

before(function() {
  nock.disableNetConnect();
});

afterEach(function() {
  nock.cleanAll();
});

function urlRoot(path) {
  return `${API_ROOT}/${path}`;
}

describe('#model', () => {
  let modelName = '';
  let Model = null;

  beforeEach(() => {
    modelName = 'foo';

    nock(API_ROOT)
      .persist()
      .get(`/${modelName}`)
      .reply(200, {
        success: true
      });

    Model = loreModelsCollections.Model.extend({
      urlRoot: urlRoot(modelName)
    });
  });

  describe('given a model name', () => {
    it('it will call the appropriate endpoint', () => {
      const model = new Model();
      model.fetch().done((result) => {
        expect(result.success).to.eq(true);
      });
    });
  });

  describe('given a sync method', () => {
    let syncCalled = 0;

    beforeEach(() => {
      modelName = 'foo';

      Model = loreModelsCollections.Model.extend({
        urlRoot: urlRoot(modelName),

        // IMPORTANT! Do not use ES6 syntax for this function. Babel does not
        // transpile Backbone.sync.apply(this, arguments) correctly
        sync: function(/* method, model, options */) {
          syncCalled++;
          return Backbone.sync.apply(this, arguments);
        }
      });
    });

    it('it will call the appropriate endpoint', () => {
      const model = new Model();
      model.fetch().done((result) => {
        expect(result.success).to.eq(true);
      });
      expect(syncCalled).to.eq(1);
    });
  });
});

describe('#collection', () => {
  let collectionName = '';
  let Collection = null;

  beforeEach(() => {
    collectionName = 'foo';

    nock(API_ROOT)
      .persist()
      .get(`/${collectionName}`)
      .reply(200, { success: true });
  });

  describe('given a urlRoot', () => {
    beforeEach(() => {
      Collection = loreModelsCollections.Collection.extend({
        url: urlRoot(collectionName)
      });
    });

    it('it will call the appropriate endpoint', () => {
      const collection = new Collection();
      collection.fetch().done((result) => {
        expect(result.success).to.eq(true);
      });
    });
  });

  describe('given a sync method', () => {
    let syncCalled = 0;

    beforeEach(() => {
      syncCalled = 0;

      Collection = loreModelsCollections.Collection.extend({
        url: urlRoot(collectionName),

        // IMPORTANT! Do not use ES6 syntax for this function. Babel does not
        // transpile Backbone.sync.apply(this, arguments) correctly
        sync: function(/* method, model, options */) {
          syncCalled++;
          return Backbone.sync.apply(this, arguments);
        }
      });
    });

    it('it will call the appropriate endpoint', () => {
      const collection = new Collection();
      collection.fetch().done((result) => {
        expect(result.success).to.eq(true);
      });
      expect(syncCalled).to.eq(1);
    });
  });
});
