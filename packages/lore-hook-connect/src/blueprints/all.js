import _ from 'lodash';

/**
 * All Connection Blueprint
 */

export default {

  defaults: {
    where: function(model) {
      return true;
    },
    exclude: function(model) {
      return false;
    },
    sortBy: function(model) {
      return true;
    }
  },

  verifyParams: function(params) {
    if (!_.isFunction(params.where)) {
      throw new Error("The 'where' field must be a function");
    }

    if (!_.isFunction(params.exclude)) {
      throw new Error("The 'exclude' field must be a function");
    }

    if (!_.isFunction(params.sortBy)) {
      throw new Error("The 'sortBy' field must be a function");
    }
  },

  getAction: function(actions) {
    // no op
  },

  getPayload: function (reducerState, params) {
    const transformed = _.transform(reducerState, function(result, model) {
      result.push(model);
    }, []);
    const filtered = _.filter(transformed, params.where);
    const excluded = _.filter(filtered, function(model) {
      return !params.exclude(model);
    });
    const sorted = _.sortBy(excluded, params.sortBy);

    return {
      state: 'RESOLVED',
      data: sorted
    };
  }

};
