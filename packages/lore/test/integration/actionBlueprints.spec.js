var expect = require('chai').expect;
var _ = require('lodash');
var Lore = require('../../src/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#actionBlueprints', function() {
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

    it("should create an action for each model and attach it to lore.actions", function() {
      lore.build();
      expect(lore.actions).to.include.keys([
        'todo',
        'list'
      ]);
    });

    it("should create actions for create(), update(), destroy(), fetch(), and fetchAll()", function() {
      lore.build();
      expect(lore.actions.todo).to.be.an('object');
      expect(_.keys(lore.actions.todo).length).to.equal(5);
      expect(lore.actions.todo).to.include.keys([
        'create',
        'update',
        'destroy',
        'fetch',
        'fetchAll'
      ]);
    });
  });

});

