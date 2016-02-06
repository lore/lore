var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../../../helpers/loaderHelper');
var definition = require('../../../../../src/hooks/reducerBlueprints/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#reducerBlueprints#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults();

    lore = {
      config: {
        reducerBlueprints: defaultConfig
      },
      models: {}
    };
  });

  describe('when no models exist', function() {

    it('should append an empty object to lore.reducers', function() {
      hook.load(lore);
      expect(lore.reducers).to.be.an('object');
      expect(_.keys(lore.reducers).length).to.equal(0);
    })
  });

  describe('and models exist', function() {

    beforeEach(function() {
      _.merge(lore, {
        models: {
          todo: {}
        }
      });
    });

    it('should create reducers for each model and append them to lore.reducers', function() {
      hook.load(lore);
      expect(lore.reducers).to.be.an('object');
      expect(_.keys(lore.reducers).length).to.equal(1);
      expect(lore.reducers.todo).to.be.a('function');
    })

  });

});

