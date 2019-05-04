var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var blueprint = require('../../src/blueprints/destroy');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');
var Model = require('@lore/backbone').Model;

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('blueprints#destroy', function() {
  var destroy;
  var todo;

  beforeEach(function() {
    var Todo = Model.extend({
      urlRoot: `${API_ROOT}/todos`
    });

    todo = {
      id: 1,
      cid: 'c1',
      state: PayloadStates.RESOLVED,
      data: {
        id: 1,
        title: 'Post Title'
      },
      error: {}
    };

    var template = {
      // blueprint: 'destroy',

      model: Todo,

      optimistic: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.DELETING
      },

      onSuccess: {
        actionType: ActionTypes.DELETE_TODO,
        payloadState: PayloadStates.RESOLVED
      },

      onError: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.ERROR_DELETING,
        beforeDispatch: function(/* response, args */) { }
      },

      onNotFound: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.NOT_FOUND
      }
    };

    destroy = blueprint(template);
  });

  it('should return an optimistic payload', function() {
    var dispatch = sinon.spy();
    destroy(todo)(dispatch);

    expect(dispatch.calledOnce).to.equal(true);

    // optimistic response
    expect(dispatch.firstCall.args[0]).to.eql({
      type: ActionTypes.UPDATE_TODO,
      payload: {
        id: 1,
        cid: todo.cid,
        state: PayloadStates.DELETING,
        data: {
          id: 1,
          title: 'Post Title'
        },
        error: {}
      }
    });
  });

  describe('when server call is successful', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .delete(`/todos/1`)
        .reply(204);
    });

    it('should return the payload', function(done) {
      var dispatch = sinon.spy();
      destroy(todo)(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.DELETE_TODO,
          payload: {
            id: 1,
            cid: todo.cid,
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
        .delete(`/todos/1`)
        .reply(403, {
          message: 'You do not have permission to delete this resource'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      destroy(todo)(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: todo.cid,
            state: PayloadStates.ERROR_DELETING,
            data: {
              id: 1,
              title: 'Post Title'
            },
            error: {
              message: 'You do not have permission to delete this resource'
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
        .delete(`/todos/1`)
        .reply(404, {
          message: 'Resource does not exist'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      destroy(todo)(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: todo.cid,
            state: PayloadStates.NOT_FOUND,
            data: {
              id: 1,
              title: 'Post Title'
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
