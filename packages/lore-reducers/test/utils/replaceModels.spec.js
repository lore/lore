const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#replaceModels', function() {
  let models = null;

  describe('when given an array of models', function() {
    beforeEach(function() {
      models = {
        data: [{
          id: '1'
        }, {
          id: '2'
        }]
      };
    });

    it('should return the new array of models', function() {
      const moreModels = {
        data: [{
          id: '3'
        }, {
          id: '4'
        }]
      };
      const result = utils.replaceModels(models, moreModels);

      expect(result).to.be.an('object');
      expect(result.data.length).to.equal(2);
      expect(result.data[0].id).to.equal('3');
      expect(result.data[1].id).to.equal('4');
    });
  });
});
