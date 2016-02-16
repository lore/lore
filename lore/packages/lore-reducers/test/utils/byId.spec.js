const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#byId', function() {
  let models = null;

  beforeEach(function() {
    models = {
      data: [{
        id: '1'
      }, {
        id: '2'
      }]
    };
  });

  describe('when given an array of models', function() {
    it('should return a dictionary with the model id for the keys', function() {
      const result = utils.byId(models);

      expect(result).to.be.an('object');
      expect(Object.keys(result).length).to.equal(2);
      expect(result).to.contain.keys(['1', '2']);
      expect(result['1']).to.equal(models.data[0]);
      expect(result['2']).to.equal(models.data[1]);
    });
  });
});
