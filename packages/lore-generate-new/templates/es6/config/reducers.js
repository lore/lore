/**
 * Configuration file for reducers
 *
 * This file is where you define overrides for the default reducer behaviors.
 */

export default {

  /****************************************************************************
   *                                                                           *
   * Specify dependencies between child reducers, which will control the order *
   * they are called in as well as what data is passed in through the third    *
   * options argument:                                                         *
   * function someReducer(state, action, options) {
   *   // `options.nextState` will contain the results of the child
   *   // reducers you have declared a dependency on
   * }
   *                                                                           *
   ****************************************************************************/

  // This is the dependency structure for models by default,
  // using the built-in blueprints:

  // dependencies: {
  //   modelName: {
  //     byId: [],
  //     byCid: [],
  //     find: ['byId', 'byCid']
  //   }
  // }

};
