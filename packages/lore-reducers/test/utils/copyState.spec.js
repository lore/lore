const expect = require('chai').expect;
const utils = require('../../src/utils');

describe('utils#copyState', function() {
  let models = null;

  describe('when given an array of models', function() {
    beforeEach(function() {
      models = {
        state: 'some-state',
        error: {},
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

    it('should copy state and error from new models', function() {
      const moreModels = {
        state: 'some-new-state',
        error: {
          message: 'error'
        },
        data: [{
          id: '3',
          cid: 'c3'
        }, {
          id: '4',
          cid: 'c4'
        }]
      };
      const result = utils.copyState(models, moreModels);
      expect(result.state).to.equal(moreModels.state);
      expect(result.error).to.equal(moreModels.error);
    });
  });
});
