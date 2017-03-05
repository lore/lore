var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var _getState = require('../../src/getState');
var toJsonKey = require('../../src/utils/toJsonKey');
var blueprints = {
  find: require('../../src/blueprints/find'),
  byId: require('../../src/blueprints/byId'),
  singleton: require('../../src/blueprints/singleton')
};

describe('blueprints#find', function() {
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
          find: null
        }
      }
    };

    storeState = {
      post: {
        find: {}
      }
    };

    key = toJsonKey({
      where: {},
      pagination: {}
    });

    testAction = {
      action: 'FETCH_POSTS',
      payload: {
        state: 'FETCHING'
      }
    };
  });

  describe('when no data exists', function() {
    var action;

    beforeEach(function() {
      action = sinon.stub().returns(testAction);
      lore.actions.post.find = action;
    });

    describe('and no params are provided', function() {
      it('should call the action', function () {
        var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
        var payload = getState(storeState, 'post.find');
        expect(payload).to.be.an('object');
        expect(payload.state).to.equal(testAction.payload.state);
        expect(action.calledOnce).to.equal(true);
      });
    });

    describe('and params are provided', function() {
      it('should call the action', function () {
        var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
        var payload = getState(storeState, 'post.find', {
          where: {
            author: 1
          },
          pagination: {
            page: 1
          }
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
      lore.actions.post.find = action;
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
        key = toJsonKey({
          where: {},
          pagination: {}
        });

        storeState.post.find[key] = reducerState;
      });

      it('should return the data and not call the action', function() {
        var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
        var payload = getState(storeState, 'post.find');
        expect(payload).to.be.an('object');
        expect(payload.state).to.equal(reducerState.state);
        expect(action.calledOnce).to.equal(false);
      });
    });

    describe('and params are provided', function() {

      beforeEach(function () {
        key = toJsonKey({
          where: {
            author: 1
          },
          pagination: {
            page: 1
          }
        });

        storeState.post.find[key] = reducerState;
      });

      it('should return the data and not call the action', function() {
        var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
        var payload = getState(storeState, 'post.find', {
          where: {
            author: 1
          },
          pagination: {
            page: 1
          }
        });
        expect(payload).to.be.an('object');
        expect(payload.state).to.equal(reducerState.state);
        expect(action.calledOnce).to.equal(false);
      });
    });

  });

});

