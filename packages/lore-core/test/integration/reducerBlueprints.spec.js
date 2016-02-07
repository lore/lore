var expect = require('chai').expect;
var Lore = require('../../src/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#reducerBlueprints', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('when models exist', function() {

    beforeEach(function() {
      loaderHelper.stub({
        models: {
          todo: {},
          list: {}
        }
      });
    });

    it("should create a reducer for each model and attach it to lore.reducers", function() {
      lore.build();
      expect(lore.reducers).to.include.keys([
        'todo',
        'list'
      ]);
      expect(lore.reducers.todo).to.be.a('function');
    });

    it("should create store states for .byId, .byCid, and. all", function() {
      lore.build();
      var state = lore.store.getState();
      expect(state.todo).to.include.keys([
        'byId',
        'byCid',
        'all'
      ]);
    });
  });

});

