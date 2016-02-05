var _ = require('lodash');
var PayloadStates = require('../../utils/PayloadStates');

module.exports = function(lore) {

  var stateMap = null;

  // key: path of the reducer under the state object, i.e. state.user.current
  // value: Object or Function that denotes how to map between the reducer state
  //        and the action to call if it's not available
  function mapFunctionGenerator(key, value) {
    if (_.isFunction(value)) {
      return value;
    }

    return function (state, params) {
      var param, action, model;

      if (value.action) {
        action = _.get(lore.actions, value.action);
        if (!action) {
          throw new Error('missing action: ' + value.action);
        }
      }

      if (value.params) {
        param = params[value.params];
        if (!param) {
          throw new Error('missing param: ' + value.params);
        }
      }

      model = _.get(state, key);

      if (model === void 0) {
        throw new Error('Model is undefined.  state:' + state + ' key:' + key);
      }

      // TODO refactor this. param is not the correct term for this.
      if (param) {
        if (_.isPlainObject(param)) {
          model = model[JSON.stringify(param)];
        } else {
          model = model[param];
        }
      }

      if (action && !model || model.state === PayloadStates.INITIAL_STATE) {
        model = action(param || params).payload;
      }

      return model;
    };
  }

  /**
   * Iterate through the reducer-to-action map, turning all keys into executable functions
   */
  function configureStateMap() {
    var reducerActionMap = lore.config.reducerActionMap;
    stateMap = {};
    _.forOwn(reducerActionMap, function (value, key) {
      stateMap[key] = mapFunctionGenerator(key, value);
    });
  }

  function generateConventionMapping(stateKey) {
    var tokens = stateKey.split('.');
    var modelName = tokens[0];
    var reducerState = tokens[1];
    var stateMap = null;

    if (reducerState === 'all') {
      stateMap = {
        action: modelName + '.fetchAll',
        params: 'where'
      };
    } else if (reducerState === 'byId') {
      stateMap = {
        action: modelName + '.fetch',
        params: 'id'
      };
    }

    if (stateMap) {
      return mapFunctionGenerator(stateKey, stateMap);
    }
  }

  return function (state, stateKey, params) {
    if (!stateMap) {
      configureStateMap();
    }
    var getState = stateMap[stateKey];
    if (!getState) {
      getState = generateConventionMapping(stateKey);
    }

    if (!getState) {
      throw new Error('no getState function found for ' + stateKey + '. Did you mean ' + Object.keys(stateMap).join(", ") + '?');
    }
    return getState(state, params);
  };

};
