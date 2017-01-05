function InvalidGetStateCall(reducerKey) {
  var newline = '\n';
  var error = new Error(
    newline + newline +
    'Invalid call to `getState(\'' + reducerKey + '\')`. Missing required attribute `id`. ' + newline +
    newline +
    'Expected method call to look like this:' + newline +
    newline +
    'getState(\'' + reducerKey + '\', {' + newline +
    '  id: 1' + newline +
    '})'
  );
  error.name = 'InvalidGetStateCall';
  return error;
}

/**
 * byId Connection Blueprint
 */

module.exports = {

  defaults: {
    id: null
  },

  verifyParams: function(params) {
    if (!params.id) {
      throw new InvalidGetStateCall(this.reducerKey);
    }
  },

  getPayload: function(reducerState, params) {
    var key = params.id;
    return reducerState[key];
  },

  callAction: function(action, params) {
    var id = params.id;
    return action(id).payload;
  },

};
