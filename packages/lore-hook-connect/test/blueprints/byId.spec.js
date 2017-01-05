var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var _getState = require('../../src/getState');

describe('blueprints#byId', function() {
  var lore, storeState, key, testAction;

  beforeEach(function () {
    lore = {
      config: {
        connect: {
          reducerActionMap: {}
        }
      },
      actions: {
        post: {
          byId: null
        }
      }
    };

    storeState = {
      post: {
        byId: {}
      }
    };

    key = 1;

    testAction = {
      action: 'FETCH_POST',
      payload: {
        state: 'FETCHING'
      }
    };
  });

  describe('when no data exists', function() {
    var action;

    beforeEach(function() {
      action = sinon.stub().returns(testAction);
      lore.actions.post.get = action;
    });

    describe('and no params are provided', function() {
      it('should throw an error', function() {
        var getState = _getState(lore);
        var fn = function() {
          getState(storeState, 'post.byId');
        };
        expect(fn).to.throw(Error);
      });
    });

    describe('and params are provided', function() {
      it('should call the action', function () {
        var getState = _getState(lore);
        var payload = getState(storeState, 'post.byId', {
          id: 1
        });
        expect(payload).to.be.an('object');
        expect(payload.state).to.equal(testAction.payload.state);
        expect(action.calledOnce).to.equal(true);
      });
    });

  });

  describe('when data exists', function() {
    var action, reducerState;

    beforeEach(function() {
      action = sinon.stub().returns(testAction);
      lore.actions.post.get = action;
    });

    beforeEach(function () {
      reducerState = {
        state: 'RESOLVED',
        data: {
          id: 1
        }
      };
    });

    describe('and no params are provided', function() {

      beforeEach(function () {
        key = 1;
        storeState.post.byId[key] = reducerState;
      });

      it('should throw an error', function() {
        var getState = _getState(lore);
        var fn = function() {
          getState(storeState, 'post.byId');
        };
        expect(fn).to.throw(Error);
      });
    });

    describe('and params are provided', function() {

      beforeEach(function () {
        key = 1;

        storeState.post.byId[key] = reducerState;
      });

      it('should return the data and not call the action', function() {
        var getState = _getState(lore);
        var payload = getState(storeState, 'post.byId', {
          id: 1
        });
        expect(payload).to.be.an('object');
        expect(payload.state).to.equal(reducerState.state);
        expect(action.calledOnce).to.equal(false);
      });
    });

  });

});

