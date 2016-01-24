var expect = require('chai').expect;
var definition = require('../../../../../lib/hooks/dialog/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#dialog#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults.dialog;

    lore = {
      dialog: defaultConfig
    };
  });

  it('should have the correct fields', function() {
    hook.load(lore);
    expect(lore.dialog).to.be.an('object');
    expect(lore.dialog.show).to.be.a('function');
  });

});

