const blueprint = require('../../src/blueprints/update');
const { ActionTypes, PayloadStates } = require('../constants');
const sinon = require('sinon');
const expect = require('chai').expect;
const Todo = require('../fixtures/todo');

describe('blueprints#update', function() {
  let template;

  beforeEach(function() {
    template = {
      blueprint: 'update',

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
      }
    };
  });

  it('should call dispatch', function() {
    const update = blueprint(template);
    const dispatch = sinon.spy();
    const params = {};
    update(params)(dispatch);
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch correct optimistic action');
  it('should dispatch correct onSuccess action');
  it('should dispatch correct onError action');
  it('should call beforeDispatch on error');
});
