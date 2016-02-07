var expect = require('chai').expect;
var definition = require('../../../../../src/hooks/collections/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#collections#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      collections: {}
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

