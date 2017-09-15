import _ from 'lodash';
import { PayloadStates } from 'lore-utils';
import toJsonKey from '../utils/toJsonKey';

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
    const state = reducerState[jsonKey];

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
