function InvalidGetStateCall(reducerKey) {
  const error = new Error(
    `
    Invalid call to 'getState('${reducerKey}'). Missing required attribute 'cid'.
    Expected method call to look like this:
    
    getState('${reducerKey}', {
      cid: 'c1'
    })`
  );
  error.name = 'InvalidGetStateCall';
  return error;
}

/**
 * byCid Connection Blueprint
 */

export default {

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
    const key = params.cid;
    return reducerState[key];
  }

};
