var expect = require('chai').expect;
var definition = require('../../../../../src/hooks/reducers/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#reducers#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      reducers: {
        dependencies: {}
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

