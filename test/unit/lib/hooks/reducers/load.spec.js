var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../../../helpers/loaderHelper');
var loader = require('../../../../../lib/loader');
var definition = require('../../../../../lib/hooks/reducers/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#reducers#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults();

    lore = {
      config: {
        reducers: defaultConfig
      },
      loader: loader({})
    };
  });

  describe('and no reducers exist', function() {

    it('should append an empty object to lore.actions', function() {
      hook.load(lore);
      expect(lore.reducers).to.be.an('object');
      expect(_.keys(lore.reducers).length).to.equal(0);
    })
  });

  describe('and reducers exist', function() {

    describe('and the reducer is a function', function() {

      beforeEach(function() {
        loaderHelper.stub({
          reducers: {
            todo: {
              count: function(){}
            }
          }
        })
      });

      it('should append the the function to lore.actions', function() {
        hook.load(lore);
        expect(_.keys(lore.reducers).length).to.equal(1);
        expect(lore.reducers.todo.count).to.be.a('function');
      });

    });

  });

});

