var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var _getState = require('../src/getState/index');
var toJsonKey = require('../src/utils/toJsonKey');
var blueprints = {
  find: require('../src/blueprints/find'),
  byId: require('../src/blueprints/byId')
};

describe('getState', function() {
  var lore, storeState, key, testAction;
  var findBlueprintAction, byIdBlueprintAction;

  beforeEach(function () {
    var findBlueprintAction = sinon.spy();
    var byIdBlueprintAction = sinon.spy();
    lore = {
      config: {
        connect: {
          // blueprints: {
          //   find: findBlueprintAction,
          //   byId: byIdBlueprintAction
          // },
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
        find: {},
        byId: {}
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

    lore.actions.post.find = findBlueprintAction;
    lore.actions.post.get = byIdBlueprintAction;

    storeState.post.find[key] = {
      state: 'RESOLVED',
      data: []
    };
    storeState.post.byId[1] = {
      id: 1,
      state: 'RESOLVED',
      data: {}
    };
  });

  describe('conventions', function() {

    it('should use the find blueprint if asking for model.find', function() {
      var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
      var payload = getState(storeState, 'post.find');
      expect(payload).to.be.an('object');
      expect(payload.state).to.equal('RESOLVED');
    });

    it('should use the byId blueprint if asking for model.byId', function() {
      var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
      var payload = getState(storeState, 'post.byId', {
        id: 1
      });
      expect(payload).to.be.an('object');
      expect(payload.id).to.equal(1);
      expect(payload.state).to.equal('RESOLVED');
    });
  });

  describe('when map does not exist', function() {

    it('should throw an error', function () {
      var getState = _getState(lore);
      var fn = function () {
        getState(storeState, 'currentUser');
      };
      expect(fn).to.throw(Error);
    });
  });

  describe('custom mapping', function() {

    beforeEach(function() {
      storeState.currentUser = {
        id: 1,
        state: 'RESOLVED',
        data: {}
      };
      lore.actions.currentUser = sinon.spy();
    });

    it('should allow user to provide a custom blueprint', function() {
      var blueprint = {
        getPayload: function(reducerState, params) {
          return reducerState;
        },

        callAction: function(action, params) {
          return action().payload;
        },
      };

      lore.config.connect.reducerActionMap.currentUser = {
        action: 'currentUser',
        blueprint: blueprint
      };

      var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
      var payload = getState(storeState, 'currentUser');
      expect(payload).to.be.an('object');
      expect(payload.state).to.equal('RESOLVED');
    });

    it('should allow user to reuse existing blueprints', function() {
      lore.config.connect.reducerActionMap.currentUser = {
        action: 'currentUser',
        blueprint: 'find'
      };

      storeState.currentUser = {};
      storeState.currentUser[key] = {
        state: 'RESOLVED'
      };

      var getState = _getState(lore.actions, blueprints, lore.config.connect.reducerActionMap);
      var payload = getState(storeState, 'currentUser');
      expect(payload).to.be.an('object');
      expect(payload.state).to.equal('RESOLVED');
    });
  });

  describe('errors', function() {

    it('should throw an error when a custom mapping does not provide a blueprint', function() {
      lore.config.connect.reducerActionMap.currentUser = {
        action: 'currentUser'
      };
      var getState = _getState(lore);
      var fn = function() {
        getState(storeState, 'currentUser');
      };
      expect(fn).to.throw(Error);
    });

    it('should throw an error when a custom mapping specifies a non-existent blueprint', function() {
      lore.config.connect.reducerActionMap.currentUser = {
        action: 'currentUser',
        blueprint: 'fake'
      };
      lore.actions.currentUser = sinon.spy();
      storeState.currentUser = {};
      var getState = _getState(lore);
      var fn = function() {
        getState(storeState, 'currentUser');
      };
      expect(fn).to.throw(Error);
    });
  })

});

