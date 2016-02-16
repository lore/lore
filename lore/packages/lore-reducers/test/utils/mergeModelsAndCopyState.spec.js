const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#mergeModelsAndCopyState', function() {
  let models = null;

  describe('when given an array of models', function() {
    beforeEach(function() {
      models = {
        state: 'some-state',
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

    it('should merge the provided models into the list and copy state', function() {
      const moreModels = {
        state: 'some-new-state',
        data: [{
          id: '3',
          cid: 'c3'
        }, {
          id: '4',
          cid: 'c4'
        }]
      };
      const result = utils.mergeModelsAndCopyState(models, moreModels);

      expect(result).to.be.an('object');
      expect(result.data.length).to.equal(4);
      expect(result.state).to.equal(moreModels.state);
    });
  });
});
