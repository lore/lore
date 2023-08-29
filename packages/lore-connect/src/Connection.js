import _ from 'lodash';
import { PayloadStates } from '@lore/utils';
import InvalidReducerKeyError from './errors/InvalidReducerKeyError';
import InvalidActionKeyError from './errors/InvalidActionKeyError';


/**
 * Connection class object. The thing all reducer-action maps are eventually instantiated as.
 *
 * @param {Object} definition : describes the connections methods and behavior
 * @param {Object} options : parameters to individualize the behavior of this connection
 * @constructor
 */

class Connection {

  constructor(definition, options) {
    /**
     * Default parameters. User params will be merged with these to
     * create the full set.
     */
    this.defaults = {};

    // apply definition overrides to class
    _.merge(this, definition || {});
    _.bindAll(this);

    /**
     * String declaring the action to invoke if there is no data in the
     * reducer state
     */
    this.actionKey = options.action || '';

    /**
     * String declaring the reducer state that should be retrieved
     */
    this.reducerKey = options.reducer || '';
    this.actions = options.actions;
  }

  /**
   * Verify whether the parameters provided to the getState call are valid
   * @param {Object} params
   */
  verifyParams(params) {
    // no op
  }

  /**
   * Get the action that should be invoked if the data does not exist
   * @param {Array} actions : array of all registered action creators
   * @returns {Function} action to invoke
   */
  getAction(actions) {
    const key = this.actionKey;
    const action = _.get(actions, key);
    if (!action) {
      throw InvalidActionKeyError(key);
    }
    return action;
  }

  /**
   * Get the subset of state associated with the reducer we're interested in
   * @param {Object} storeState : the state of the Redux Store
   * @returns {Object} the piece of state owned by the reducer
   */
  getReducerState(storeState) {
    const key = this.reducerKey;
    const reducerState = _.get(storeState, key);
    if (!reducerState) {
      throw InvalidReducerKeyError(key);
    }
    return reducerState;
  }

  /**
   * Extract the data we care about from the reducer's state
   * @param {Object} reducerState : subset of state owned by the reducer we care about
   * @param {Object} params : parameters provided to the getState call
   */
  getPayload(reducerState, params, reducer) {
    // no op
  }

  /**
   * Call the action responsible for retrieving the data we want
   * @param action : the action that can retrieve the data we want
   * @param params : parameters provided to the getState call
   */
  callAction(action, params) {
    // no op
  }

  /**
   * This is the main function for connections, and orchestrates the logic to
   * validate paramters, extract data from the Redux store, and call the action
   * to retrieve the data if it doesn't exist.
   *
   * @param {Object} state : the state of the Redux Store
   * @param {Object} userParams : parameters passed to the getState function
   * @returns {Object} payload sent to the Redux Store
   */
  getState(state, userParams, options = {}) {
    const params = _.defaultsDeep({}, userParams, this.defaults);
    this.verifyParams(params);

    const action = this.getAction(this.actions);
    const reducerState = this.getReducerState(state);
    let payload = this.getPayload(reducerState, params, _.get(state, this.reducerKey.split('.')[0]));

    if (!payload || payload.state === PayloadStates.INITIAL_STATE || options.force) {
      payload = this.callAction(action, params) || payload;
    }

    return payload;
  }

  _getState(state, userParams, options = {}) {
    const params = _.defaultsDeep({}, userParams, this.defaults);
    this.verifyParams(params);

    const action = this.getAction(this.actions);
    const reducerState = this.getReducerState(state);
    return this.getPayload(reducerState, params, _.get(state, this.reducerKey.split('.')[0]));
  }

}

export default Connection;
