import ActionTypes from '../../constants/ActionTypes';
import PayloadStates from '../../constants/PayloadStates';
import _ from 'lodash';

const initialState = {
  state: PayloadStates.INITIAL_STATE
};

export default function byId(state, action) {
  state = state || initialState;
  const nextState = _.assign({}, state);

  switch (action.type) {
    case ActionTypes.PERMISSIONS_FOR_CURRENT_USER:
      return action.payload;

    default:
      return nextState;
  }
};
