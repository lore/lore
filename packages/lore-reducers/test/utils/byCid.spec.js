const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#byCid', function() {
  let models = null;

  beforeEach(function() {
    models = {
      data: [{
        cid: 'c1'
      }, {
        cid: 'c2'
      }]
    };
  });

  describe('when given an array of models', function() {
    it('should return a dictionary with the model cid for the keys', function() {
      const result = utils.byCid(models);

      expect(result).to.be.an('object');
      expect(Object.keys(result).length).to.equal(2);
      expect(result).to.contain.keys(['c1', 'c2']);
      expect(result.c1).to.equal(models.data[0]);
      expect(result.c2).to.equal(models.data[1]);
    });
  });
});
