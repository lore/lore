const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#getIndex', function() {
  let models = null;

  describe('when given an array of models', function() {
    describe('that have both id and cid', function() {
      beforeEach(function() {
        models = {
          data: [{
            id: '1',
            cid: 'c1'
          }, {
            id: '2',
            cid: 'c2'
          }]
        };
      });

      it('should return index of first model', function() {
        const model = models.data[0];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(0);
      });

      it('should return index of second model', function() {
        const model = models.data[1];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(1);
      });
    });

    describe('that have only cid', function() {
      beforeEach(function() {
        models = {
          data: [{
            id: null,
            cid: 'c1'
          }, {
            id: null,
            cid: 'c2'
          }]
        };
      });

      it('should return index of first model', function() {
        const model = models.data[0];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(0);
      });

      it('should return index of second model', function() {
        const model = models.data[1];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(1);
      });
    });

    describe('that have mixed id and cid specified', function() {
      beforeEach(function() {
        models = {
          data: [{
            id: null,
            cid: 'c1'
          }, {
            id: '2',
            cid: 'c2'
          }]
        };
      });

      it('should return index of first model', function() {
        const model = models.data[0];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(0);
      });

      it('should return index of second model', function() {
        const model = models.data[1];
        const result = utils.getIndex(models, model);
        expect(result).to.equal(1);
      });
    });
  });
});
