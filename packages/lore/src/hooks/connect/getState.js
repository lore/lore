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

      // NOTE: this line (and the defaultParams creation in value) was created
      // in order to prevent the need to pass `{where: {}}` into the `model.all`
      // call. But there's undoubtedly a better way to do it. This approach should
      // be refactored/re-examined when pagination is implemented.
      if (value.defaultParams) {
        params = _.defaultsDeep(params || {}, value.defaultParams);
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
        if (_.isPlainObject(param) && value.params === 'where') {
          // TODO: Account for this issue but in a less hacky way
          // Problem: there is no specification regarding how objects get serialized or
          // in what order. For Lore, we NEED the keys be identical, regardless
          // of the order of the parameters inside of them. For now, this should guarntee
          // the keys matches what's in the reducer state, as this object is created in this same
          // way inside of the find method in lore-actions (where property first, then pagination)
          // There should be a more general solution created however when generating keys, that will
          // iterate over an object and recreate a new object by alphabetizing all the keys. That
          // way it can be a generic "toKey(params)" function.
          //
          // More information about browser order for objects at this link:
          // https://bugs.chromium.org/p/v8/issues/detail?id=164
          var _paramOrderHack = {
            where: params.where,
            pagination: params.pagination
          };
          model = model[JSON.stringify(_paramOrderHack)];
        } else if (_.isPlainObject(param)) {
          // TODO: for real, refactor this whole 'param' concept
          // The block above was added as after pagination was introduced, because the "where" clause
          // could no longer be extracted to form the correct key, and thus would cause an infinite
          // loop to be triggered as the key would never match the query.
          // Plus...shouldn't the blueprints be decided what parameters are required, not this file?
          model = model[JSON.stringify(param)];
        } else {
          model = model[param];
        }
      }

      if (action && !model || model.state === PayloadStates.INITIAL_STATE) {
        model = action(param || params, params.pagination).payload;
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

    if (reducerState === 'find') {
      stateMap = {
        action: modelName + '.find',
        params: 'where',
        defaultParams: {
          where: {}
        }
      };
    } else if (reducerState === 'byId') {
      stateMap = {
        action: modelName + '.get',
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
