var expect = require('chai').expect;
var _ = require('lodash');
var loaderHelper = require('../../lore/test/helpers/loaderHelper');
var definition = require('../src/index');
var Hook = require('@lore/utils').Hook;

describe('load', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults;

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

