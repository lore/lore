var expect = require('chai').expect;
var _ = require('lodash');
var definition = require('../../../../../lib/hooks/redux/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#redux#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    expect(_.keys(hook.defaults).length).to.equal(1);
    expect(hook.defaults).to.include.keys([
      'redux'
    ]);
    expect(_.keys(hook.defaults.redux).length).to.equal(1);
    expect(hook.defaults.redux).to.include.keys([
      'middleware'
    ]);
    expect(hook.defaults.redux.middleware.length).to.equal(1);
    expect(hook.defaults.redux.middleware[0]).to.be.a('function');
  });

});

