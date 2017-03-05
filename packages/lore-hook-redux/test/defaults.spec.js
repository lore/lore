var expect = require('chai').expect;
var _ = require('lodash');
var definition = require('../src/index');
var Hook = require('lore-utils').Hook;

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    expect(_.keys(hook.defaults).length).to.equal(1);
    expect(hook.defaults).to.include.keys([
      'redux'
    ]);
    expect(_.keys(hook.defaults.redux).length).to.equal(5);
    expect(hook.defaults.redux).to.include.keys([
      'middleware',
      'enhancer',
      'rootReducer',
      'preloadedState',
      'configureStore'
    ]);
    expect(hook.defaults.redux.middleware.length).to.equal(1);
    expect(hook.defaults.redux.middleware[0]).to.be.a('function');
  });

});

