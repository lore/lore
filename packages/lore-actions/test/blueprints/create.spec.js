var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var blueprint = require('../../src/blueprints/create');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');
var Model = require('@lore/backbone').Model;

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('blueprints#create', function() {
  var create;
  var cid = '';

  beforeEach(function() {
    var Todo = Model.extend({
      urlRoot: `${API_ROOT}/todos`
    });

    var template = {
      // blueprint: 'create',

      model: Todo,

      optimistic: {
        actionType: ActionTypes.ADD_TODO,
        payloadState: PayloadStates.CREATING
      },

      onSuccess: {
        actionType: ActionTypes.UPDATE_TODO,
        payloadState: PayloadStates.RESOLVED
      },

      onError: {
        actionType: ActionTypes.DELETE_TODO,
        payloadState: PayloadStates.ERROR_CREATING,
        beforeDispatch: function(/* response, args */) { }
      }
    };

    create = blueprint(template);
    cid = '';
  });

  describe('when server call is successful', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .post(`/todos`)
        .reply(201, {
          id: 1,
          title: 'Post Title'
        });
    });

    it('should return the payload', function(done) {
      var dispatch = sinon.spy();
      var params = {
        title: 'Post Title'
      };
      create(params)(dispatch);
      cid = dispatch.firstCall.args[0].payload.cid;

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // optimistic response
        expect(dispatch.firstCall.args[0]).to.eql({
          type: ActionTypes.ADD_TODO,
          payload: {
            id: undefined,
            cid: cid,
            state: PayloadStates.CREATING,
            data: {
              title: 'Post Title'
            },
            error: {}
          }
        });

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
        .post(`/todos`)
        .reply(409, {
          message: 'Title already exists'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      var params = {
        title: 'Post Title'
      };
      create(params)(dispatch);
      cid = dispatch.firstCall.args[0].payload.cid;

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.DELETE_TODO,
          payload: {
            id: undefined,
            cid: cid,
            state: PayloadStates.ERROR_CREATING,
            data: {
              title: 'Post Title'
            },
            error: {
              message: 'Title already exists'
            }
          }
        });

        done();
      }, TEST_DELAY);
    });

  });

});
