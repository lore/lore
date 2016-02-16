var expect = require('chai').expect;
var _ = require('lodash');
var Model = require('../../../../../../lore-models').Model;
var Collection = require('../../../../../../lore-models').Collection;
var definition = require('../../../../../src/hooks/collections/index');
var loaderHelper = require('../../../../helpers/loaderHelper');
var loader = require('../../../../../src/loader');
var Hook = require('../../../../../src/Hook');

describe('hooks#collections#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults;

    lore = {
      config: {
        collections: defaultConfig
      },
      loader: loader({})
    };
  });

  describe('when no models exist in /models', function() {

    beforeEach(function() {
      loaderHelper.stub({
        models: {}
      });
    });

    it("lore.collections should be an empty object", function() {
      hook.load(lore);
      expect(lore.collections).to.be.an('object');
      expect(_.keys(lore.models).length).to.equal(0);
    });
  });

  describe('when models exist in /models', function() {

    beforeEach(function() {
      loaderHelper.stub({
        models: {
          todo: {},
          list: {}
        }
      });

      lore.models = {
        todo: Model,
        list: Model
      };
    });

    it("lore.collections[modelName] should be a Collection", function() {
      hook.load(lore);
      expect(lore.collections).to.be.an('object');
      expect(_.keys(lore.collections).length).to.equal(2);
      expect(lore.collections).to.include.keys([
        'todo',
        'list'
      ]);
      expect(new lore.collections.todo()).to.be.instanceOf(Collection);
    });
  });

  describe('when collections exist in /collections, but no models in /models', function() {

    beforeEach(function() {
      loaderHelper.stub({
        collections: {
          todo: {},
          list: {}
        }
      });

      lore.models = {};
    });

    it("lore.collections[collectionName] should be a Collection", function() {
      hook.load(lore);
      expect(lore.collections).to.be.an('object');
      expect(_.keys(lore.collections).length).to.equal(2);
      expect(lore.collections).to.include.keys([
        'todo',
        'list'
      ]);
      expect(new lore.collections.todo()).to.be.instanceOf(Collection);
    });
  });

});

