var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../lore/test/helpers/loaderHelper');
var loader = require('../../lore/src/loader');
var definition = require('../src/index');
var Hook = require('@lore/utils').Hook;

describe('load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults;

    lore = {
      config: {
        reducers: defaultConfig.reducers
      },
      loader: loader({})
    };
  });

  describe('and no reducers exist', function() {

    it('should append an empty object to lore.reducers', function() {
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
              index: function(){}
            },
            list: function(){}
          }
        })
      });

      it('should append the the function to lore.reducers', function() {
        hook.load(lore);
        expect(_.keys(lore.reducers).length).to.equal(2);
        expect(lore.reducers.todo).to.be.a('function');
        expect(lore.reducers.list).to.be.a('function');
      });

    });

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

