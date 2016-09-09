var expect = require('chai').expect;
var sinon = require('sinon');
var Lore = require('../../src/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#reducers', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('when a model exists', function() {

    beforeEach(function() {
      loaderHelper.stub({
        models: {
          todo: {}
        }
      });
    });

    it("should create reducers for each model and attach them to lore.reducers", function() {
      lore.build();
      expect(lore.reducers).to.include.keys([
        'todo'
      ]);
      expect(lore.reducers.todo).to.be.a('function');
    });
  });

  describe('when a reducer exists without a matching model', function() {
    beforeEach(function() {
      loaderHelper.stub({
        reducers: {
          todo: function(state, action) {
            return state || {};
          }
        }
      });
    });

    it("should create reducers for each files and attach them to lore.reducers", function() {
      lore.build();
      expect(lore.reducers).to.include.keys([
        'todo'
      ]);
      expect(lore.reducers.todo).to.be.a('function');
    });
  });

  describe('reducer overrides', function() {
    var spy = null;

    describe('when user provides a reducer with the same as the model', function() {
      beforeEach(function() {
        var reducer = function(state, action) {
          return state || {};
        };
        spy = sinon.spy(reducer);
        loaderHelper.stub({
          models: {
            todo: {}
          },
          reducers: {
            todo: spy
          }
        });
      });

      it("it should use the reducer created by the user instead of the blueprint", function() {
        lore.build();
        // lore.reducers.todo();
        expect(spy.called).to.equal(true);
      });
    });

    describe('when user provides a reducer called index inside a folder named after a model', function() {
      beforeEach(function() {
        var reducer = function(state, action) {
          return state || {};
        };
        spy = sinon.spy(reducer);
        loaderHelper.stub({
          models: {
            todo: {}
          },
          reducers: {
            todo: {
              index: spy
            }
          }
        });
      });

      it("it should use the index reducer instead of the blueprint", function() {
        lore.build();
        // lore.reducers.todo();
        expect(spy.called).to.equal(true);
      });
    });

    describe('when user provides a reducer named after the blueprint for a model', function() {
      beforeEach(function() {
        var reducer = function(state, action) {
          return state || {};
        };
        spy = sinon.spy(reducer);
        loaderHelper.stub({
          models: {
            todo: {}
          },
          reducers: {
            todo: {
              byId: spy
            }
          }
        });
      });

      it("it should use that reducer instead of the blueprint", function() {
        lore.build();
        // lore.reducers.todo();
        expect(spy.called).to.equal(true);
      });
    });

    describe('when user provides a reducer inside a folder named after a model', function() {
      beforeEach(function() {
        var reducer = function(state, action) {
          return state || {};
        };
        spy = sinon.spy(reducer);
        loaderHelper.stub({
          models: {
            todo: {}
          },
          reducers: {
            todo: {
              byUser: spy
            }
          }
        });
      });

      it("it should add that reducer to the set provided by the blueprints", function() {
        lore.build();
        expect(lore.store.getState().todo.byUser).to.be.an('object');
        expect(spy.called).to.equal(true);
      });
    });

    describe('when user provides a reducer that does not match a model name', function() {
      beforeEach(function() {
        var reducer = function(state, action) {
          return state || {};
        };
        spy = sinon.spy(reducer);
        loaderHelper.stub({
          models: {
            todo: {}
          },
          reducers: {
            list: spy
          }
        });
      });

      it("it should add that reducer to those created from models", function() {
        lore.build();
        // lore.reducers.todo();
        expect(spy.called).to.equal(true);
      });
    });
  })

});

