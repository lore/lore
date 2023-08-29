import _ from 'lodash';
import { compositeReducer } from '@lore/reducers';

function isValidIndexReducer(folderName, reducer) {
  if (_.isFunction(reducer)) {
    return true;
  }

  throw new Error([
    `Looks like you are trying to create a reducer called 'index' in a folder `,
    `called ${folderName} but the reducer is not a function. Reducers must be `,
    `functions with the signature 'function(state, action)'.`
  ].join(''));
}

export function getReducers(config={}, modules={}) {
  const {
    reducers: {
      // blueprints: {
      //   find,
      //   byId,
      //   byCid
      // },
      blueprints: _blueprints,
      dependencies: _dependencies,
      nextState: _nextState
    }
  } = config;

  /*
   * Get the names of all models and user-defined reducers
   */

  const modelNames = _.keys(modules.models);
  const userReducers = modules.reducers;


  /*
   * Get reducer set for each model based on blueprints
   */

  const reducers = _.reduce(modelNames, function(result, modelName) {
    result[modelName] = {
      find: _blueprints.find(modelName),
      byId: _blueprints.byId(modelName),
      byCid: _blueprints.byCid(modelName)
    };
    return result;
  }, {});


  /*
   * If there are any reducers in src/reducers that match the name of one of
   * the models, use them to overwrite the default blueprints
   */

  _.intersection(_.keys(userReducers), modelNames).forEach(function(modelName) {

    /*
     * If reducer is a function, toss out the blueprints as this
     * function will be managing the reducer flow itself
     *
     * Example:
     *
     * /reducers
     *    |- foo.js => where foo exports a function with signature [function(state, action)]
     */

    if (_.isFunction(userReducers[modelName])) {
      reducers[modelName] = userReducers[modelName];
    }

    /*
     * If reducer is an object, use it to overwrite the blueprint
     * reducers like byId, byCid, and find
     *
     * Example:
     * /reducers
     *  |- foo.js     => where foo exports an object
     *  |- /foo       => where foo is a folder, with files inside matching the name
     *     |- byId.js    of one of the blueprint reducers (byId, byCid, find)
     */

    if (_.isPlainObject(userReducers[modelName])) {
      reducers[modelName] = _.assign(reducers[modelName], userReducers[modelName]);
    }

    /*
     * If reducer is a folder with an 'index' file, and that file exports
     * a function, use that function as the reducer
     *
     * Example:
     * /foo
     *   |- index.js => where index exports a function with signature [function(state, action)]
     */

    if (
      reducers[modelName].index &&
      isValidIndexReducer(modelName, reducers[modelName].index)
    ) {
      reducers[modelName] = reducers[modelName].index;
    }

  });


  /*
   * Iterate through the reducers, locate any that are still objects (which is most
   * likely a result of being created from blueprints) and convert them into a real
   * reducer, which is to say a function with the signature [function(state, action)]
   */

  _.mapValues(reducers, function(reducer, reducerName) {
    if (_.isFunction(reducer)) {
      return;
    }

    /*
     * Generate a set of reducer dependencies so we can figure out which order they should be
     * run in and whether the result from one reducer (like byCid) should be passed to another
     * reducer (like find).
     *
     * The dependencies are generated from defaults (matching blueprint expectations) and
     * overwritten by anything set in config/reducers under 'dependencies'
     */

    const dependencies = _.assign({
        byId: [],
        byCid: [],
        find: ['byId', 'byCid']
      },
      _dependencies[reducerName]
    );

    // Iterate through the child reducers and make sure there's an entry created for each of
    // them, and default to [] if none exists. This can happen in the scenario where an custom
    // child reducer was created that doesn't match one of the blueprints (byId, byCid, find)

    _.keys(reducer).forEach(function(childReducerName) {
      dependencies[childReducerName] = dependencies[childReducerName] || [];
    });

    /*
     * Create a single reducer function from the combination of the child reducers, their
     * interdependencies (the order they should run in), the model name (used to generate
     * the action names to listen for), and the nextState() function, which is optional, but
     * can be used to copy or transform the state before providing it to the application, as
     * a way to avoid giving the application a direct reference to the reducer's state
     */

    reducers[reducerName] = compositeReducer({
      reducers: reducer,
      dependencies: dependencies,
      modelName: reducerName,
      nextState: _nextState,
    });
  });


  /*
   * Finally, see if there are any user-defined reducers that don't match the name of
   * one of the models (which means no blueprints have been created) and add them to the
   * reducers object
   */

  _.difference(_.keys(userReducers), modelNames).forEach(function(reducerName) {
    const reducer = userReducers[reducerName];

    if (_.isFunction(reducer)) {
      reducers[reducerName] = reducer;
      return;
    }

    if (
      reducer.index &&
      isValidIndexReducer(reducerName, reducer.index)
    ) {
      reducers[reducerName] = reducer.index;
      return;
    }

    throw new Error([
      `Looks like you are trying to create a composite reducer called ${reducerName} but did `,
      `not provide a reducer for the base of the Redux store. If you want to have your root reducer `,
      `inside a folder, please name it 'index', such as '/reducers/${reducerName}/index.js'. If you `,
      `want to have it located under '/reducers', please take it out of the folder and call `,
      `it '/reducers/${reducerName}.js'.`
    ].join(''));
  });


  /*
   * Return the final set of reducers
   */

  return reducers;
}
