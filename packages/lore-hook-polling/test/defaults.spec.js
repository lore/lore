var expect = require('chai').expect;
var definition = require('../src/index').default;
var Hook = require('lore-utils').Hook;

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      polling: {
        interval: 5000,
        delayOnStart: true
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

