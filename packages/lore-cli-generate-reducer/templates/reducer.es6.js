import _ from 'lodash';
import ActionTypes from '../constants/ActionTypes';
import PayloadStates from '../constants/PayloadStates';

const initialState = {
  state: PayloadStates.INITIAL_STATE,
  data: []
};

export default function(state = initialState, action) {
  let nextState = _.assign({}, state);

  switch (action.type) {
    // case ActionTypes.FOUND_SOMETHING_COOL:
    //   // push the cool things into the array of other cool things
    //   return _.assign(nextState, {
    //      data: nextState.data.concat(action.payload.data)
    //    });

    default:
      return nextState
  }
}
