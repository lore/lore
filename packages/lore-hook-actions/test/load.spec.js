var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../lore/test/helpers/loaderHelper');
var loader = require('../../lore/src/loader');
var definition = require('../src/index');
var Model = require('lore-models').Model;
var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var Hook = require('lore-utils').Hook;

describe('load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults;

    lore = {
      config: {
        actions: defaultConfig
      },
      loader: loader({}),
      store: {
        dispatch: function(){}
      }
    };
  });

  describe('and no actions exist', function() {

    it('should append an empty object to lore.actions', function() {
      hook.load(lore);
      expect(lore.actions).to.be.an('object');
      expect(_.keys(lore.actions).length).to.equal(0);
    })
  });

  describe('and actions exist', function() {

    describe('and the action is a function', function() {

      beforeEach(function() {
        loaderHelper.stub({
          actions: {
            todo: {
              create: function(){}
            }
          }
        })
      });

      it('should append the the function to lore.actions', function() {
        hook.load(lore);
        expect(lore.actions).to.be.an('object');
        expect(_.keys(lore.actions).length).to.equal(1);
        expect(lore.actions.todo.create).to.be.a('function');
      });

    });

    describe('and the action is a template', function() {

      beforeEach(function() {
        loaderHelper.stub({
          actions: {
            todo: {
              create: {
                blueprint: 'create',
                model: Model,
                optimistic: {
                  actionType: ActionTypes.add('todo'),
                  payloadState: PayloadStates.CREATING
                },
                onSuccess: {
                  actionType: ActionTypes.update('todo'),
                  payloadState: PayloadStates.RESOLVED
                },
                onError: {
                  actionType: ActionTypes.remove('todo'),
                  payloadState: PayloadStates.ERROR_CREATING
                }
              }
            }
          }
        });
      });

      it('should convert the template to a function and append it to lore.actions', function() {
        hook.load(lore);
        expect(lore.actions).to.be.an('object');
        expect(_.keys(lore.actions).length).to.equal(1);
        expect(lore.actions.todo.create).to.be.a('function');
      });

    });

  });

});

