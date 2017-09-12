import _ from 'lodash';
import toJsonKey from '../utils/toJsonKey';
import { PayloadStates } from 'lore-utils';

/**
 * First Connection Blueprint
 */

export default {

  defaults: {
    where: {},
    pagination: {}
  },

  getPayload: function(reducerState, params, reducer) {
    const jsonKey = toJsonKey(params);
    let state = reducerState[jsonKey];

    if (state) {
      if (state.state !== PayloadStates.FETCHING) {
        if (state.data.length === 0) {
          return _.assign({}, {
            id: undefined,
            cid: undefined,
            state: PayloadStates.NOT_FOUND,
            data: {},
            error: {}
          }, _.pick(state, ['meta', 'query']));
        }
        return _.assign({}, state.data[0], _.pick(state, ['meta', 'query']));
      }
    }

    return state;
  },

  callAction: function(action, params) {
    return action(params.where, params.pagination).payload;
  },

};
