var expect = require('chai').expect;
var Lore = require('../../src/app/index');

var loaderHelper = require('../helpers/loaderHelper');

describe('', function() {
  var ran = false;
  beforeEach(function() {

    loaderHelper.stub({
      initializers: [function() {
        ran = true;
      }]
    });

    lore = new Lore();
  });

  it('it should run any loaders', function() {
      lore.build();
      expect(ran).to.equal(true);
  });

});

