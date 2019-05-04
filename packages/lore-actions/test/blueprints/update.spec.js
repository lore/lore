var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var blueprint = require('../../src/blueprints/update');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');
var Model = require('@lore/backbone').Model;

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('blueprints#update', function() {
  var update;
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
        payloadState: PayloadStates.UPDATING
      },

      onSuccess: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.RESOLVED
      },

      onError: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.ERROR_UPDATING,
        beforeDispatch: function(/* response, args */) { }
      },

      onNotFound: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.NOT_FOUND
      }
    };

    update = blueprint(template);
  });

  it('should return an optimistic payload', function() {
    var dispatch = sinon.spy();
    update(todo)(dispatch);

    expect(dispatch.calledOnce).to.equal(true);

    // optimistic response
    expect(dispatch.firstCall.args[0]).to.eql({
      type: ActionTypes.UPDATE_TODO,
      payload: {
        id: 1,
        cid: todo.cid,
        state: PayloadStates.UPDATING,
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
        .put(`/todos/1`)
        .reply(200, {
          title: 'New Post Title'
        });
    });

    it('should return the payload', function(done) {
      var dispatch = sinon.spy();
      update(todo, {
        title: 'New Post Title'
      })(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: todo.cid,
            state: PayloadStates.RESOLVED,
            data: {
              id: 1,
              title: 'New Post Title'
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
        .put(`/todos/1`)
        .reply(403, {
          message: 'You do not have permission to modify this resource'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      update(todo, {
        title: 'New Post Title'
      })(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            id: 1,
            cid: todo.cid,
            state: PayloadStates.ERROR_UPDATING,
            data: {
              id: 1,
              title: 'New Post Title'
            },
            error: {
              message: 'You do not have permission to modify this resource'
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
        .put(`/todos/1`)
        .reply(404, {
          message: 'Resource does not exist'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      update(todo, {
        title: 'New Post Title'
      })(dispatch);

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
              title: 'New Post Title'
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
