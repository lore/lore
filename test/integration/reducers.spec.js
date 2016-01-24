var expect = require('chai').expect;
var Lore = require('../../lib/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#reducers', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('when reducers exist', function() {
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

  })

});

