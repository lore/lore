import _ from 'lodash';
import toJsonKey from '../utils/toJsonKey';

/**
 * Find Connection Blueprint
 */

export default {

  defaults: {
    where: {},
    pagination: {},
    include: function(model, params) {
      return false;
    },
    exclude: function(model) {
      return false;
    },
    uniqBy: function(model) {
      return model.cid;
    },
    sortBy: function(model) {
      return true;
    }
  },

  getPayload: function(reducerState, params, reducer) {
    const jsonKey = toJsonKey(params);
    let state = reducerState[jsonKey];

    if (state) {
      let data = _.transform(reducer.byCid, function(result, model) {
        result.push(model);
      }, []);

      if (params.include) {
        data = _.filter(data, function(datum) {
          return params.include(datum, params);
        });
      }

      state = _.assign({}, state, {
        data: state.data.concat(data)
      });

      if (params.exclude) {
        state.data = _.filter(state.data, function(model) {
          return !params.exclude(model);
        });
      }

      if (params.uniqBy) {
        state.data = _.uniqBy(state.data, params.uniqBy);
      }

      if (params.sortBy) {
        state.data = _.sortBy(state.data, params.sortBy);
      }
    }

    return state;
  },

  callAction: function(action, params) {
    return action(params.where, params.pagination).payload;
  }

};
