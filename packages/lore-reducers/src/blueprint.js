const _ = require('lodash');

/**
 * Blueprint for building reducers from a set of common behaviors
 *
 * @param params = [
 *   {
 *     actionType: types.ADD_TODO,
 *     method: utils.addOrUpdateModel
 *   },{
 *     actionType: types.UPDATE_TODO,
 *     method: utils.updateModel
 *   },{
 *     actionType: types.REMOVE_TODO,
 *     method: utils.removeModel
 *   },{
 *     actionType: types.FETCH_TODOS,
 *     method: utils.mergeModels
 *   }
 * ]
 * @returns blueprint(state, action){}
 */

function validateInitialState(initialState) {
  if (!initialState.state) {
    throw new Error('missing initialState.state');
  }

  if (!initialState.data) {
    throw new Error('missing initialState.data');
  }
}

module.exports = function blueprint(initialState = {}, params = {}) {
  validateInitialState(initialState);

  return function reducer(state, action) {
    const newState = state || initialState;
    const actionType = action.type;

    if (!actionType) {
      throw new Error('action.type is undefined');
    }

    const param = _.find(params, {
      actionType: actionType
    });

    if (param) {
      return param.method(newState, action.payload);
    }

    return newState;
  };
};
