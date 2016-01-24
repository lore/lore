var expect = require('chai').expect;
var definition = require('../../../../../lib/hooks/collections/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#collections#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      collections: {}
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

