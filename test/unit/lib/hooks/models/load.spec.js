var expect = require('chai').expect;
var _ = require('lodash');
var definition = require('../../../../../lib/hooks/models/index');
var loaderHelper = require('../../../../helpers/loaderHelper');
var loader = require('../../../../../lib/loader');
var Model = require('../../../../../packages/lore-models').Model;
var Hook = require('../../../../../lib/Hook');

describe('hooks#models#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults.models;

    lore = {
      config: {
        models: defaultConfig
      },
      hooks: {

      }
    };
    lore.loader = loader(lore.config);
  });

  describe('when no models exist in /models', function() {

    beforeEach(function() {
      loaderHelper.stub({
        models: {}
      });
    });

    it("should append models to lore.models", function() {
      hook.load(lore);
      expect(lore.models).to.be.an('object');
      expect(_.keys(lore.models).length).to.equal(0);
    });
  });

  describe('and models exist in /models', function() {
    beforeEach(function() {
      loaderHelper.stub({
        models: {
          todo: {},
          list: {}
        }
      });
    });

    it("should create the models and attach them to lore.models.modelName", function() {
      hook.load(lore);
      expect(lore.models).to.be.an('object');
      expect(_.keys(lore.models).length).to.equal(2);
      expect(lore.models).to.include.keys([
        'todo',
        'list'
      ]);
      expect(new lore.models.todo()).to.be.instanceOf(Model);
    });
  });

});

