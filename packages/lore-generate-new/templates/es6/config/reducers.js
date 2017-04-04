/**
 * Configuration file for reducers
 *
 * This file is where you define overrides for the default reducer behaviors.
 */

export default {

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
   *
   * The default dependency structure (based on the built-in blueprints) looks
   * like this:
   */

  // dependencies: {
  //   modelName: {
  //     byId: [],
  //     byCid: [],
  //     find: ['byId', 'byCid']
  //   }
  // }

}
