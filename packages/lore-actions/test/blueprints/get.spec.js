var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var blueprint = require('../../src/blueprints/get');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');
var Model = require('lore-models').Model;

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('blueprints#get', function() {
  var get;
  var cid = '';

  beforeEach(function() {
    var Todo = Model.extend({
      urlRoot: `${API_ROOT}/todos`
    });

    var template = {
      // blueprint: 'get',

      model: Todo,

      optimistic: {
        actionType: ActionTypes.ADD_TODO,
        payloadState: PayloadStates.FETCHING
      },

      onSuccess: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.RESOLVED
      },

      onError: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.ERROR_FETCHING,
        beforeDispatch: function(/* response, args */) { }
      },

      onNotFound: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.NOT_FOUND
      }
    };

    get = blueprint(template);
    cid = '';
  });

  it('should return an optimistic payload', function() {
    var dispatch = sinon.spy();
    var id = 1;
    get(id)(dispatch);
    expect(dispatch.calledOnce).to.equal(true);
    cid = dispatch.firstCall.args[0].payload.cid;

    // optimistic response
    expect(dispatch.firstCall.args[0]).to.eql({
      type: ActionTypes.ADD_TODO,
      payload: {
        id: 1,
        cid: cid,
        state: PayloadStates.FETCHING,
        data: {
          id: 1
        },
        error: {}
      }
    });
  });

  describe('when server call is successful', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/todos/1`)
        .reply(200, {
          title: 'Post Title'
        });
    });

    it('should return the payload', function(done) {
      var dispatch = sinon.spy();
      var id = 1;
      get(id)(dispatch);
      cid = dispatch.firstCall.args[0].payload.cid;

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: cid,
            state: PayloadStates.RESOLVED,
            data: {
              id: 1,
              title: 'Post Title'
            },
            error: {}
          }
        });

        done();
      }, TEST_DELAY);
    });

  });

  describe('when server returns an error', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/todos/1`)
        .reply(403, {
          message: 'You do not have permission to retrieve this resource'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      var id = 1;
      get(id)(dispatch);
      cid = dispatch.firstCall.args[0].payload.cid;

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: cid,
            state: PayloadStates.ERROR_FETCHING,
            data: {
              id: 1
            },
            error: {
              message: 'You do not have permission to retrieve this resource'
            }
          }
        });

        done();
      }, TEST_DELAY);
    });

  });

  describe('when the resource does not exist', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/todos/1`)
        .reply(404, {
          message: 'Resource does not exist'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      var id = 1;
      get(id)(dispatch);
      cid = dispatch.firstCall.args[0].payload.cid;

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: cid,
            state: PayloadStates.NOT_FOUND,
            data: {
              id: 1
            },
            error: {
              message: 'Resource does not exist'
            }
          }
        });

        done();
      }, TEST_DELAY);
    });

  });

});
