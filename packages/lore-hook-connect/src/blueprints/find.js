import toJsonKey from '../utils/toJsonKey';

/**
 * Find Connection Blueprint
 */

export default {

  defaults: {
    where: {},
    pagination: {}
  },

  getPayload: function(reducerState, params) {
    const jsonKey = toJsonKey(params);
    return reducerState[jsonKey];
  },

  callAction: function(action, params) {
    return action(params.where, params.pagination).payload;
  }

};
