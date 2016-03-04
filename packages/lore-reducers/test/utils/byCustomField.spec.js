const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#byCustomField', function() {
  let models = null;

  beforeEach(function() {
    models = {
      data: [{
        customField: 'cf1'
      }, {
        customField: 'cf2'
      }]
    };
  });

  describe('when given an array of models', function() {
    it('should return a dictionary with the specified attribute used as the key', function() {
      const result = utils.byCustomField('customField', models);

      expect(result).to.be.an('object');
      expect(Object.keys(result).length).to.equal(2);
      expect(result).to.contain.keys(['cf1', 'cf2']);
      expect(result.cf1).to.equal(models.data[0]);
      expect(result.cf2).to.equal(models.data[1]);
    });
  });
});
