var expect = require('chai').expect;
var definition = require('../../../../../lib/hooks/actionBlueprints/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#actionBlueprints#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {};
    expect(hook.defaults()).to.deep.equal(defaultConfig);
  });

});

