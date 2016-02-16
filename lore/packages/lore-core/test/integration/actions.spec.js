var expect = require('chai').expect;
var _ = require('lodash');
var Lore = require('../../src/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#actions', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('when actions exist', function() {
    beforeEach(function() {
      loaderHelper.stub({
        actions: {
          todo: {
            create: function(){}
          }
        }
      });
    });

    it("should create actions for each file and attach them to lore.actions", function() {
      lore.build();
      expect(lore.actions).to.include.keys([
        'todo'
      ]);
      expect(lore.actions.todo.create).to.be.a('function');
    });

  });

});

