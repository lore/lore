import { ActionTypes, PayloadStates } from '@lore/utils';
import _ from 'lodash';

export function reducerGenerator(modelName) {
  const initialState = {
    state: PayloadStates.INITIAL_STATE
  };

  return function authHookReducer(state = initialState, action) {
    const nextState = _.assign({}, state);

    switch (action.type) {
      case ActionTypes.add(modelName):
        return action.payload;

      case ActionTypes.update(modelName):
        return action.payload;

      case ActionTypes.remove(modelName):
        return action.payload;

      case ActionTypes.RESET_STORE:
        return initialState;

      default:
        return nextState;
    }
  };
}
