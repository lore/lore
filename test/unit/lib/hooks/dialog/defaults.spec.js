var expect = require('chai').expect;
var definition = require('../../../../../lib/hooks/dialog/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#dialog#defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      dialog: {
        domElementId: "dialog"
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

