const blueprint = require('../../src/blueprints/fetch');
const { ActionTypes, PayloadStates } = require('../constants');
const sinon = require('sinon');
const expect = require('chai').expect;
const Todo = require('../fixtures/todo');

describe('blueprints#fetch', function() {
  let template;

  beforeEach(function() {
    template = {
      blueprint: 'fetch',

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
      }
    };
  });

  it('should call dispatch', function() {
    const fetch = blueprint(template);
    const dispatch = sinon.spy();
    const params = {};
    fetch(params)(dispatch);
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch correct optimistic action');
  it('should dispatch correct onSuccess action');
  it('should dispatch correct onError action');
  it('should call beforeDispatch on error');
});
