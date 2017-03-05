var expect = require('chai').expect;
var definition = require('../src/index');
var Hook = require('lore-utils').Hook;

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      connect: {
        blueprints: {
          find: require('../src/blueprints/find'),
          byId: require('../src/blueprints/byId'),
          singleton: require('../src/blueprints/singleton')
        },
        reducerActionMap: {},
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

