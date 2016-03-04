var expect = require('chai').expect;
var index = require('../src/index');

var params;

describe('by default', function() {
  beforeEach(function() {
    params = {};
  })

  it('when missing a generator throws an error', function() {
    expect(function() {
      index(params)
    }).to.throw('Sorry, `scope.generator` must be defined.');
  });

  describe('when given a generator type', function() {
    beforeEach(function() {
      params.generatorType = 'new';
    })

    it('when missing a log throws an error', function() {
      expect(function() {
        index(params)
      }).to.throw('Sorry, `scope.generator` must be defined.');
    });
  });
});

