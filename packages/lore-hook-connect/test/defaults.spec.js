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
          singleton: require('../src/blueprints/singleton'),
          all: require('../src/blueprints/all'),
          byCid: require('../src/blueprints/byCid')
        },
        reducerActionMap: {
          '*.all': {
            action: null,
            reducer: '*.byCid',
            blueprint: 'all'
          },
          '*.byCid': {
            action: null,
            reducer: '*.byCid',
            blueprint: 'byCid'
          },
          '*.byId': {
            action: '*.get',
            reducer: '*.byId',
            blueprint: 'byId'
          },
          '*.find': {
            action: '*.find',
            reducer: '*.find',
            blueprint: 'find'
          }
        },
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

