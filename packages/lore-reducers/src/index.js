/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import compositeReducer from './reducer';
import find from './blueprints/find';
import byId from './blueprints/byId';
import byCid from './blueprints/byCid';
import loader from './loader';
export { getConfig } from './getConfig';

const blueprints = {
  find,
  byId,
  byCid
};

export const getReducers = function(configOverride, modelNames) {
  const result = {}; // todo: allow to default after reducerBlueprints hook has been deleted
  // lore.models = lore.models || {};
  // const config = lore.config.reducers;
  const config = getConfig(configOverride);

  const userReducers = loader.load();
  const reducers = {};
  const dependencies = {};

  // Combine all the reducer dependencies so we can figure out the load order
  modelNames.forEach(function(modelName) {
    const blueprintDependencies = {
      byId: [],
      byCid: [],
      find: ['byId', 'byCid']
    };
    const userDependencies = config.dependencies[modelName];
    dependencies[modelName] = _.assign({},
      blueprintDependencies,
      userDependencies
    );
  });

  // Combine all the reducers
  modelNames.forEach(function(modelName) {
    const blueprintReducers = {
      find: blueprints.find(modelName),
      byId: blueprints.byId(modelName),
      byCid: blueprints.byCid(modelName)
    };

    // If the user defined a function matching the model name,
    // toss out the blueprints - the user will be managing the
    // reducer flow themselves
    if (_.isFunction(userReducers[modelName])) {
      reducers[modelName] = userReducers[modelName];
    } else {
      reducers[modelName] = _.assign({},
        blueprintReducers,
        userReducers[modelName]
      );
    }

    // If the user defined a reducer called 'index', use that
    // for the root and ignore all the other reducers - the user
    // will be managing the reducer flow themselves
    if (reducers[modelName].index) {
      reducers[modelName] = reducers[modelName].index;
    }
  });

  // Create the composite reducer
  modelNames.forEach(function(modelName) {
    const reducer = reducers[modelName];
    if (_.isFunction(reducer)) {
      result[modelName] = reducer;
    } else {
      // Add empty dependencies for any user-defined reducers to insert into the blueprints
      Object.keys(reducer).forEach(function(reducerName) {
        dependencies[modelName][reducerName] = dependencies[modelName][reducerName] || [];
      });

      result[modelName] = compositeReducer(
        reducer,
        dependencies[modelName],
        config,
        modelName
      );
    }
  });

  // Add in any reducers that don't match model names
  const nonModelReducers = _.difference(Object.keys(userReducers), modelNames);
  nonModelReducers.forEach(function(reducerName) {
    const userReducer = userReducers[reducerName];
    let reducer = null;

    if (_.isFunction(userReducer)) {
      reducer = userReducer;
    } else if (userReducer.index) {
      if (_.isFunction(userReducer.index)) {
        reducer = userReducer.index;
      } else {
        throw new Error(
          `Looks like you are trying to create a reducer called 'index' in a folder called ${reducerName}
          but the reducer is not a function. Reducers must be functions with the signature 'function(state, action)'.`
        );
      }
    } else {
      throw new Error(
        `Looks like you are trying to create a composite reducer called ${reducerName}
        but did not provide a reducer for the base of the Redux store. If you want to have your
        root reducer inside a folder, please name it 'index', such as '/reducers/${reducerName}/index.js'.
        If you want to have it located under '/reducers', please take it out of the folder and call it '/reducers/${reducerName}.js'.`
      );
    }

    result[reducerName] = reducer;
  });

  return result;
};
