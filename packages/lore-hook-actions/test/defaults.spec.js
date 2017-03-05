var expect = require('chai').expect;
var definition = require('../src/index');
var Hook = require('lore-utils').Hook;
var _ = require('lodash');

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      actions: {
        normalize: true,
        addCidToBody: false,
        cidBodyAttributeName: 'cid',
        // blueprints : {
        //   create: function() {...},
        //   destroy: function() {...},
        //   find: function() {...},
        //   get: function() {...},
        //   update: function() {...},
        // }
      }
    };

    expect(_.keys(hook.defaults.actions).length).to.equal(4);
    expect(hook.defaults.actions).to.include.keys([
      'normalize',
      'addCidToBody',
      'cidBodyAttributeName',
      'blueprints'
    ]);

    expect(_.pick(hook.defaults.actions, [
      'normalize',
      'addCidToBody',
      'cidBodyAttributeName'
    ])).to.deep.equal(defaultConfig.actions);

    expect(_.keys(hook.defaults.actions.blueprints).length).to.equal(5);
    expect(hook.defaults.actions.blueprints).to.include.keys([
      'create',
      'destroy',
      'find',
      'get',
      'update'
    ]);
  });

});

