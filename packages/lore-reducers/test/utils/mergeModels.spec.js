const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#mergeModels', function() {
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

    describe('and none of the new models exist', function() {
      it('should merge the provided models into the list', function() {
        const moreModels = {
          data: [{
            id: '3',
            cid: 'c3'
          }, {
            id: '4',
            cid: 'c4'
          }]
        };
        const result = utils.mergeModels(models, moreModels);

        expect(result).to.be.an('object');
        expect(result.data.length).to.equal(4);
      });
    });

    describe('and some of the new models exist', function() {
      it('should update the models that exist', function() {
        const moreModels = {
          data: [{
            id: '2',
            cid: 'c2',
            data: {
              name: 'updated'
            }
          }, {
            id: '3',
            cid: 'c3'
          }]
        };
        const result = utils.mergeModels(models, moreModels);

        expect(result).to.be.an('object');
        expect(result.data.length).to.equal(3);
        expect(result.data[1].data.name).to.equal('updated');
      });
    });
  });
});
