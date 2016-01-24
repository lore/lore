var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../../../helpers/loaderHelper');
var definition = require('../../../../../lib/hooks/connect/index');
var Hook = require('../../../../../lib/Hook');

describe('hooks#connect#load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults();

    lore = {
      config: {
        connect: defaultConfig
      }
    };
  });

  it('should append a function to lore.connect', function() {
    hook.load(lore);
    expect(lore.connect).to.be.a('function');
  });

});

