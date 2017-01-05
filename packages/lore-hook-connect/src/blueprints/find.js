var _ = require('lodash');
var toJsonKey = require('../utils/toJsonKey');

/**
 * Find Connection Blueprint
 */

module.exports = {

  defaults: {
    where: {},
    pagination: {}
  },

  getPayload: function(reducerState, params) {
    var jsonKey = toJsonKey(params);
    return reducerState[jsonKey];
  },

  callAction: function(action, params) {
    return action(params.where, params.pagination).payload;
  },

};
