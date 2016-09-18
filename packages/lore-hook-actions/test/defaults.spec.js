var expect = require('chai').expect;
var definition = require('../src/index');
var Hook = require('lore-utils').Hook;

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {};
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

