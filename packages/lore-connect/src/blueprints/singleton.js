/**
 * Singleton Connection Blueprint
 */

export default {

  getPayload: function(reducerState, params) {
    return reducerState;
  },

  callAction: function(action, params) {
    return action().payload;
  }

};
