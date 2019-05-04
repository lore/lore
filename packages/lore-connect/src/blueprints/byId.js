function InvalidGetStateCall(reducerKey) {
  const error = new Error(
    `
    Invalid call to 'getState('${reducerKey}')'. Missing required attribute 'id'.
    Expected method call to look like this:
    
    getState('${reducerKey}', {
      id: 1
    })`
  );
  error.name = 'InvalidGetStateCall';
  return error;
}

/**
 * byId Connection Blueprint
 */

export default {

  defaults: {
    id: null
  },

  verifyParams: function(params) {
    if (!params.id) {
      throw new InvalidGetStateCall(this.reducerKey);
    }
  },

  getPayload: function(reducerState, params) {
    const key = params.id;
    return reducerState[key];
  },

  callAction: function(action, params) {
    const id = params.id;
    const query = params.query;
    return action(id, query).payload;
  }

};
