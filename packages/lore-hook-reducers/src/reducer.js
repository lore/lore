/* eslint no-param-reassign: "off" */
/* eslint max-len: "off" */

import _ from 'lodash';
import { ActionTypes } from 'lore-utils';
import sortReducersByLoadOrder from './sortReducersByLoadOrder';

// threshold in milliseconds that must be reached before issuing performance warning
const THRESHOLD_MS = 5;

export default function compositeReducer(reducers, dependencies, config, modelName) {
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

    // If we receive an action to reset the store (such as when logging out) or this
    // specific reducer node, reset the state to the initial state
    if (
      action.type === ActionTypes.reset(modelName) ||
      action.type === ActionTypes.RESET_STORE
    ) {
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

      // start the timer
      const start = Date.now();

      nextState[reducerName] = reducers[reducerName](
        state[reducerName],
        action,
        { nextState: nextState }
      );

      // Provide the config the ability to modify the next state returned
      const stop = Date.now();
      const diffInMs = stop - start;
      if (diffInMs >= THRESHOLD_MS) {
        // console.warn('Reducer "' + reducerName + '" took ' + diffInMs + 'ms for ' + action.type);
        // console.warn(`Reducer "${modelName}.${reducerName}" took ${diffInMs}ms for ${action.type}`);
      }
    });

    return config.nextState(nextState);
  };
}
