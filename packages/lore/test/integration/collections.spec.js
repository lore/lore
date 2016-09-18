var expect = require('chai').expect;
var Lore = require('../../src/app/index');
var loaderHelper = require('../helpers/loaderHelper');
var config = {
  hooks: require('../defaultHooks')
};

describe('lore#collections', function() {
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

    it("should instantiate them and attach them to lore.collections", function() {
      lore.build(config);
      expect(lore.collections).to.include.keys([
        'todo',
        'list'
      ]);
      expect(lore.collections.todo).to.be.a('function');
    });
  });

  describe('when collections exist', function() {

    beforeEach(function() {
      loaderHelper.stub({
        collections: {
          todo: {},
          list: {}
        }
      });
    });

    it("should instance them and attach them to lore.collections", function() {
      lore.build(config);
      expect(lore.collections).to.include.keys([
        'todo',
        'list'
      ]);
      expect(lore.collections.todo).to.be.a('function');
    });
  });

  describe('when models and collections exist', function() {

    beforeEach(function() {
      loaderHelper.stub({
        config: {
          collections: {
            apiRoot: 'https://config.collections',
            pluralize: false
          }
        },
        models: {
          todo: {
            apiRoot: 'https://models.todo'
          }
        },
        collections: {
          todo: {
            pluralize: true,
            properties: {
              customFunction: function() {}
            }
          }
        }
      });
    });

    it('should create combine the two to create the proper configuration', function() {
      lore.build(config);
      var prototype = lore.collections.todo.prototype;
      expect(prototype.url).to.equal('https://models.todo/todos');
      expect(prototype.customFunction).to.be.a('function');
    });
  });

});

