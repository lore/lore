const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#updateModel', function() {
  let models = null;

  describe('when given an array of models', function() {
    beforeEach(function() {
      models = {
        data: [{
          id: '1',
          cid: 'c1'
        }, {
          id: '2',
          cid: 'c2',
          data: {
            name: 'second'
          }
        }]
      };
    });

    describe('and the provided model does not exist', function() {
      it('should throw an error', function() {
        const model = {
          id: '3',
          cid: 'c3'
        };
        const fn = utils.updateModel.bind(null, models, model);
        expect(fn).to.throw(Error, 'index < 0');
      });
    });

    describe('and the provided model does exist', function() {
      it('should update the model within the list', function() {
        const model = {
          id: '2',
          cid: 'c2',
          data: {
            name: 'updated'
          }
        };
        const result = utils.updateModel(models, model);

        expect(result).to.be.an('object');
        expect(result.data.length).to.equal(2);
        expect(result.data[1].data.name).to.deep.equal('updated');
      });
    });
  });
});
