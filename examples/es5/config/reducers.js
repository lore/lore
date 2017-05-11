/**
 * Configuration file for reducers
 *
 * This file is where you define overrides for the default reducer behaviors.
 */

module.exports = {

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

  // nextState: function(nextState) {
  //   return _.cloneDeep(nextState);
  // }

};
