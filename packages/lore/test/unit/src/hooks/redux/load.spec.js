var expect = require('chai').expect;
var _ = require('lodash');
var loader = require('../../../../../src/loader');
var definition = require('../../../../../src/hooks/redux/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#redux#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults.redux;

    lore = {
      config: {
        redux: defaultConfig
      },
      loader: loader({})
    };
  });

  describe('and no reducers exist', function() {

    beforeEach(function() {
      _.merge(lore, {
        reducers: {}
      })
    });

    it('should append the Redux Store to lore.store', function() {
      hook.load(lore);
      expect(lore.store).to.be.an('object');
      expect(_.keys(lore.store).length).to.equal(4);
      expect(lore.store).to.include.keys([
        'dispatch',
        'getState',
        'replaceReducer',
        'subscribe'
      ]);
    })
  });

  describe('and reducers exist', function() {

    beforeEach(function() {
      _.merge(lore, {
        reducers: {
          todo: function() {
            return {};
          }
        }
      })
    });

    it('should append the Redux Store to lore.store', function() {
      hook.load(lore);
      expect(lore.store).to.be.an('object');
      expect(_.keys(lore.store).length).to.equal(4);
      expect(lore.store).to.include.keys([
        'dispatch',
        'getState',
        'replaceReducer',
        'subscribe'
      ]);
    });

  });

});

