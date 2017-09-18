import _ from 'lodash';
import toJsonKey from '../utils/toJsonKey';

/**
 * Find Connection Blueprint
 */

export default {

  defaults: {
    where: {},
    pagination: {},
    include: {
      where: function(model) {
        return false;
      },
      uniqBy: function(model) {
        return model.cid;
      },
      sortBy: function(model) {
        return true;
      }
    },
    exclude: {
      where: function(model) {
        return false;
      }
    }
  },

  getPayload: function(reducerState, params, reducer) {
    const jsonKey = toJsonKey(params);
    let state = reducerState[jsonKey];

    if (state) {
      let data = _.transform(reducer.byCid, function(result, model) {
        result.push(model);
      }, []);

      if (params.include.where) {
        data = _.filter(data, params.include.where);
      }

      state = _.assign({}, state, {
        data: state.data.concat(data)
      });

      if (params.include.uniqBy) {
        state.data = _.uniqBy(state.data, params.include.uniqBy);
      }

      if (params.include.sortBy) {
        state.data = _.sortBy(state.data, params.include.sortBy);
      }

      if (params.exclude.where) {
        state.data = _.filter(state.data, function(model) {
          return !params.exclude.where(model);
        });
      }
    }

    return state;
  },

  callAction: function(action, params) {
    return action(params.where, params.pagination).payload;
  }

};
