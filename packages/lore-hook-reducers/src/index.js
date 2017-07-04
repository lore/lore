/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import compositeReducer from './reducer';
import find from './blueprints/find';
import byId from './blueprints/byId';
import byCid from './blueprints/byCid';

const blueprints = {
  find,
  byId,
  byCid
};

export default {

  dependencies: ['models'],

  defaults: {
    reducers: {

      /**
       * Specify dependencies between child reducers, which will determine the
       * order they are called in, as well as what data is passed in through the
       * third 'options' argument:
       *
       * function someReducer(state, action, options) {
       *   // your reducer code...
       * }
       *
       * The `options.nextState` property will contain the results of the child
       * reducers you have declared a dependency on.
       */

      dependencies: {},

      /**
       * Change what gets returned from the Redux store.
       *
       * This method is intended ONLY as a way to explore different solutions for addressing
       * immutability concerns that arise when components have a direct reference to
       * the data kept in the reducers.
       *
       * The default behavior in Redux is to provide components with a reference to the
       * store state returned from the reducers. This poses a problem when a component
       * tries to change that data, because it will modify the state of the store through
       * that reference.
       *
       * To address this issue, the top-level reducer will invoke this method right before
       * returning the next state, which gives you the ability to experiment with different
       * solutions for this problem.
       *
       * The default behavior is to return a copy of the store state, which will prevent any
       * component from being able to modify the "truth" kept in the reducers.
       *
       * Others solutions could be invoking `Object.freeze(nextState)` (which will throw an
       * error if a component tries to modify the store state) or converting the store state
       * to an Immutable object using `Immutable.map(nextState)` from Immutable.js.
       */

      nextState: function(nextState) {
        return _.cloneDeep(nextState);
      }

    }
  },

  load: function(lore) {
    lore.reducers = {}; // todo: allow to default after reducerBlueprints hook has been deleted
    lore.models = lore.models || {};
    const config = lore.config.reducers;

    const userReducers = lore.loader.loadReducers();
    const reducers = {};
    const dependencies = {};

    // Combine all the reducer dependencies so we can figure out the load order
    Object.keys(lore.models).forEach(function(modelName) {
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
    Object.keys(lore.models).forEach(function(modelName) {
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
    Object.keys(lore.models).forEach(function(modelName) {
      const reducer = reducers[modelName];
      if (_.isFunction(reducer)) {
        lore.reducers[modelName] = reducer;
      } else {
        // Add empty dependencies for any user-defined reducers to insert into the blueprints
        Object.keys(reducer).forEach(function(reducerName) {
          dependencies[modelName][reducerName] = dependencies[modelName][reducerName] || [];
        });

        lore.reducers[modelName] = compositeReducer(
          reducer,
          dependencies[modelName],
          config
        );
      }
    });

    // Add in any reducers that don't match model names
    const nonModelReducers = _.difference(Object.keys(userReducers), Object.keys(lore.models));
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

      lore.reducers[reducerName] = reducer;
    });
  }

};
