var expect = require('chai').expect;
var definition = require('../../../../../src/hooks/models/index');
var Hook = require('../../../../../src/Hook');

describe('hooks#models#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      models: {
        apiRoot: 'https://api.example.com',
        pluralize: true,
        properties: {}
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

