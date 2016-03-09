const blueprint = require('../../src/blueprints/find');
const { ActionTypes, PayloadStates } = require('../constants');
const sinon = require('sinon');
const expect = require('chai').expect;
const Todos = require('../fixtures/todos');

describe('blueprints#find', function() {
  let template;

  beforeEach(function() {
    template = {
      blueprint: 'find',

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
  });

  it('should call dispatch', function() {
    const find = blueprint(template);
    const dispatch = sinon.spy();
    const params = {};
    find(params)(dispatch);
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch correct optimistic action');
  it('should dispatch correct onSuccess action');
  it('should dispatch correct onError action');
  it('should call beforeDispatch on error');
});
