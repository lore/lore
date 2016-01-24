const expect = require('chai').expect;
const sinon = require('sinon');
const blueprint = require('../src/blueprint');

describe('blueprint', function() {
  const ActionTypes = {
    ACTION_ONE: 'ACTION_ONE',
    ACTION_TWO: 'ACTION_TWO'
  };

  describe('when initialState not provided', function() {
    it('should throw an error', function() {
      expect(blueprint).to.throw(Error);
    });
  });

  describe('when initialState not valid', function() {
    it('should throw an error', function() {
      const fn = blueprint.bind(null, {
        not: 'valid'
      });
      expect(fn).to.throw(Error);
    });
  });

  describe('when initialState is valid', function() {
    describe('and no params are provided', function() {
      it('should return initialState', function() {
        const initialState = {
          state: 'some-state',
          data: 1
        };

        const reducer = blueprint(initialState);
        const result = reducer(null, {
          type: ActionTypes.ACTION_ONE,
          payload: {}
        });
        expect(result).to.equal(initialState);
      });
    });

    describe('and params are provided', function() {
      it('should call the expected method', function() {
        const initialState = {
          state: 'some-state',
          data: 1
        };

        const params = [{
          actionType: ActionTypes.ACTION_ONE,
          method: sinon.spy()
        }, {
          actionType: ActionTypes.ACTION_TWO,
          method: sinon.spy()
        }];

        const reducer = blueprint(initialState, params);
        reducer(null, {
          type: ActionTypes.ACTION_ONE,
          payload: {}
        });

        expect(params[0].method.called).to.equal(true);
        expect(params[1].method.called).to.equal(false);
      });
    });
  });
});
