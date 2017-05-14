function InvalidGetStateCall(reducerKey) {
  var newline = '\n';
  var error = new Error(
    newline + newline +
    'Invalid call to `getState(\'' + reducerKey + '\')`. Missing required attribute `cid`. ' + newline +
    newline +
    'Expected method call to look like this:' + newline +
    newline +
    'getState(\'' + reducerKey + '\', {' + newline +
    "  cid: 'c1'" + newline +
    '})'
  );
  error.name = 'InvalidGetStateCall';
  return error;
}

/**
 * byCid Connection Blueprint
 */

module.exports = {

  defaults: {
    cid: null
  },

  verifyParams: function(params) {
    if (!params.cid) {
      throw new InvalidGetStateCall(this.reducerKey);
    }
  },

  getAction: function(actions) {
    // no op
  },

  getPayload: function(reducerState, params) {
    var key = params.cid;
    return reducerState[key];
  }

};
