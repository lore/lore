const blueprint = require('../../src/blueprints/create');
const { ActionTypes, PayloadStates } = require('../constants');
const sinon = require('sinon');
const expect = require('chai').expect;
const Todo = require('../fixtures/todo');

describe('blueprints#create', function() {
  let template;

  beforeEach(function() {
    template = {
      blueprint: 'create',

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
  });

  it('should call dispatch', function() {
    const create = blueprint(template);
    const dispatch = sinon.spy();
    const params = {};
    create(params)(dispatch);
    expect(dispatch.called).to.equal(true);
  });

  it('should dispatch correct optimistic action');
  it('should dispatch correct onSuccess action');
  it('should dispatch correct onError action');
  it('should call beforeDispatch on error');
});
