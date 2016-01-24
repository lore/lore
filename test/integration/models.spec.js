var expect = require('chai').expect;
var Lore = require('../../lib/app/index');
var loaderHelper = require('../helpers/loaderHelper');

describe('lore#models', function() {
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

    it("should instantiate them and attach to lore.models", function() {
      lore.build();
      expect(lore.models).to.include.keys([
        'todo',
        'list'
      ]);
      expect(lore.models.todo).to.be.a('function');
    });
  });

  describe('when models/config and models/todo both exist', function() {

    beforeEach(function() {
      loaderHelper.stub({

      });

      loaderHelper.stub({
        config: {
          models: {
            apiRoot: 'https://config.models',
            properties: {
              propA: 'a'
            }
          }
        },
        models: {
          todo: {
            pluralize: false,
            properties: {
              propB: 'b'
            }
          }
        }
      });
    });

    it("the final properties should be a combination of the two configurations", function() {
      lore.build();
      var prototype = lore.models.todo.prototype;
      expect(prototype.urlRoot).to.equal('https://config.models/todo');
      expect(prototype.propA).to.equal('a');
      expect(prototype.propB).to.equal('b');
    });

  });

});

