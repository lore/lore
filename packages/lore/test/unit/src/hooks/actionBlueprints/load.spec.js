var expect = require('chai').expect;
var _ = require('lodash');
var definition = require('../../../../../src/hooks/actionBlueprints/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#actionBlueprints#load', function() {

  var defaultConfig = null;
  var hook = null;
  var lore = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults;
    lore = {
      config: {
        actionBlueprints: defaultConfig
      },
      models: {},
      collections: {}
    };
  });

  describe('if no models or collections exist', function() {
    var lore = null;

    beforeEach(function() {
      lore = {
        config: {
          actionBlueprints: defaultConfig
        },
        models: {},
        collections: {}
      };
    });

    it('should append nothing to the lore object', function() {
      hook.load(lore);
      expect(lore.actions).to.not.exist;
    })
  });

  describe('if models and collections exist', function() {
    var lore = null;

    beforeEach(function() {
      lore = {
        config: {
          actionBlueprints: defaultConfig
        },
        models: {
          todo: {}
        },
        collections: {}
      };
    });

    it('should create actions and append them to lore.actions', function() {
      hook.load(lore);
      expect(lore.actions).to.be.an('object');
      expect(_.keys(lore.actions).length).to.equal(1);
      expect(lore.actions.todo).to.be.an('object');
      expect(_.keys(lore.actions.todo).length).to.equal(5);
      expect(lore.actions.todo).to.include.keys([
        'create',
        'destroy',
        'get',
        'find',
        'update'
      ]);
    })
  });

});

