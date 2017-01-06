/**
 * Singleton Connection Blueprint
 */

module.exports = {

  getPayload: function(reducerState, params) {
    return reducerState;
  },

  callAction: function(action, params) {
    return action().payload;
  },

};
