const blueprint = require('../../src/blueprints/destroy');
const { ActionTypes, PayloadStates } = require('../constants');
const sinon = require('sinon');
const expect = require('chai').expect;
const Todo = require('../fixtures/todo');

describe('blueprints#destroy', function() {
  let template;

  beforeEach(function() {
    template = {
      blueprint: 'destroy',

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
      }
    };
  });

  it('should call dispatch', function() {
    const destroy = blueprint(template);
    const dispatch = sinon.spy();
    const params = {};
    destroy(params)(dispatch);
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch correct optimistic action');
  it('should dispatch correct onSuccess action');
  it('should dispatch correct onError action');
  it('should call beforeDispatch on error');
});
