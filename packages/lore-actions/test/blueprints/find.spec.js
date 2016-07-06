var expect = require('chai').expect;
var sinon = require('sinon');
var nock = require('nock');
var blueprint = require('../../src/blueprints/find');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');
var Collection = require('lore-models').Collection;

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('blueprints#find', function() {
  var find;

  beforeEach(function() {
    var Todos = Collection.extend({
      url: `${API_ROOT}/todos`
    });

    var template = {
      // blueprint: 'get',

      collection: Todos,

      optimistic: {
        actionType: ActionTypes.FETCH_TODOS,
        payloadState: PayloadStates.FETCHING
      },

      onSuccess: {
        actionType: ActionTypes.FETCH_TODOS,
        payloadState: PayloadStates.RESOLVED
      },

      onError: {
        actionType: ActionTypes.FETCH_TODOS,
        payloadState: PayloadStates.ERROR_FETCHING,
        beforeDispatch: function(/* response, args */) { }
      }
    };

    find = blueprint(template);
  });

  it('should return an optimistic payload', function() {
    var dispatch = sinon.spy();
    var id = 1;
    find()(dispatch);
    expect(dispatch.calledOnce).to.equal(true);

    // optimistic response
    expect(dispatch.firstCall.args[0]).to.eql({
      type: ActionTypes.FETCH_TODOS,
      query: {},
      payload: {
        state: PayloadStates.FETCHING,
        data: [],
        meta: undefined,
        error: {}
      }
    });
  });

  describe('when server call is successful', function() {

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/todos`)
        .reply(200, [{
          id: 1,
          title: 'Post Title'
        }]);
    });

    it('should return the payload', function(done) {
      var dispatch = sinon.spy();
      find()(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        var action = dispatch.secondCall.args[0];
        expect(action.payload.data.length).to.eql(1);

        var cid = action.payload.data[0].cid;
        expect(action).to.eql({
          type: ActionTypes.FETCH_TODOS,
          query: {},
          payload: {
            state: PayloadStates.RESOLVED,
            data: [
              {
                id: 1,
                cid: cid,
                state: PayloadStates.RESOLVED,
                data: {
                  id: 1,
                  title: 'Post Title'
                },
                error: {}
              }
            ],
            meta: undefined,
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
        .get(`/todos`)
        .reply(403, {
          message: 'You do not have permission to retrieve this resource'
        });
    });

    it('should populate payload with the error', function(done) {
      var dispatch = sinon.spy();
      find()(dispatch);

      setTimeout(function() {
        expect(dispatch.calledTwice).to.equal(true);

        // resolved response
        expect(dispatch.secondCall.args[0]).to.eql({
          type: ActionTypes.FETCH_TODOS,
          query: {},
          payload: {
            state: PayloadStates.ERROR_FETCHING,
            data: [],
            meta: undefined,
            error: {
              message: 'You do not have permission to retrieve this resource'
            }
          }
        });

        done();
      }, TEST_DELAY);
    });

  });

});
