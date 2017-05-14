var _ = require('lodash');

/**
 * All Connection Blueprint
 */

module.exports = {

  defaults: {
    where: function(model) {
      return true;
    },
    sortBy: function(model) {
      return true;
    }
  },

  verifyParams: function(params) {
    if (!_.isFunction(params.where)) {
      throw new Error("The 'where' field must be a function");
    }

    if (!_.isFunction(params.sortBy)) {
      throw new Error("The 'sortBy' field must be a function");
    }
  },

  getAction: function(actions) {
    // no op
  },

  getPayload: function (reducerState, params) {
    var data = _
      .chain(reducerState)
      .transform(function(result, model) {
        result.push(model);
      }, [])
      .filter(params.where)
      .sortBy(params.sortBy)
      .value();

    return {
      state: 'RESOLVED',
      data: data
    };
  }

};
