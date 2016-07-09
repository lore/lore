const expect = require('chai').expect;
const utils = require('../src/utils');

describe('utils', function() {
  let model = null;
  let state = null;
  let error = null;

  beforeEach(function() {
    model = {
      id: 1,
      cid: 'c1',
      toJSON: function() {
        return {
          name: 'testModel'
        };
      }
    };
    state = 'ERROR_CREATING';
    error = {
      field: 'someError'
    };
  });

  describe('#payload', function() {
    it('should convert arguments into the correct object', function() {
      const result = utils.payload(model, state, error);

      expect(result).to.deep.equal({
        id: 1,
        cid: 'c1',
        state: 'ERROR_CREATING',
        data: {
          name: 'testModel'
        },
        error: {
          field: 'someError'
        }
      });
    });
  });

  describe('#payloadCollection', function() {
    it('should convert arguments into the correct object', function() {
      const collection = {
        models: [model]
      };
      state = 'ERROR_FETCHING';

      const result = utils.payloadCollection(collection, state, error, {where: {}, pagination: undefined});

      expect(result).to.deep.equal({
        state: 'ERROR_FETCHING',
        data: [{
          id: 1,
          cid: 'c1',
          state: 'ERROR_FETCHING',
          data: {
            name: 'testModel'
          },
          error: {
            field: 'someError'
          }
        }],
        query: {
          where: {},
          pagination: undefined
        },
        meta: undefined,
        error: {
          field: 'someError'
        }
      });
    });
  });
});
