/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import { ActionTypes } from 'lore-utils';
import sortReducersByLoadOrder from './sortReducersByLoadOrder';

export default function compositeReducer(reducers, dependencies, config) {
  const loadOrder = sortReducersByLoadOrder(dependencies);

  // Create an initial state object from the reducer names
  // const initialState = {
  //   find: undefined,
  //   byId: undefined,
  //   byCid: undefined
  // };
  const initialState = _.mapValues(reducers, function() {
    return undefined;
  });

  return function (state = initialState, action) {
    const nextState = {};

    // If we receive an action to reset the store (such as when logging out)
    // reset the state to the initial state
    if (action.type === ActionTypes.RESET_STORE) {
      state = initialState;
    }

    loadOrder.forEach(function(reducerName) {
      // Equivalent to calling:
      // const _find = find(state.find, action, {
      //   nextState: {
      //     byCid: _byCid,
      //     byId: _byId
      //   }
      // })
      nextState[reducerName] = reducers[reducerName](
        state[reducerName],
        action,
        { nextState: nextState }
      );
    });

    // Provide the config the ability to modify the next state returned
    return config.nextState(nextState);
  };
}
