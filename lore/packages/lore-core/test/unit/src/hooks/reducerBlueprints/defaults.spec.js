var expect = require('chai').expect;
var definition = require('../../../../../src/hooks/reducerBlueprints/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#reducerBlueprints#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {};
    expect(hook.defaults()).to.deep.equal(defaultConfig);
  });

});

