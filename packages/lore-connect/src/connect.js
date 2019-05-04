/* eslint no-shadow: "off" */
/* eslint react/no-is-mounted: "warn" */
/* eslint react/prefer-es6-class: "off" */

import React, { useContext } from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import invariant from 'invariant';
import storeShape from './utils/storeShape';
import getDisplayName from './utils/getDisplayName';

import ActionsContext from './contexts/ActionsContext';
import BlueprintsContext from './contexts/BlueprintsContext';
import ReducerActionMapContext from './contexts/ReducerActionMapContext';
import StoreContext from './contexts/StoreContext';
import getConnection from './getConnection';

/**
 * Decorator for React components that allows the component to specify what data they need
 * and will automatically fetch that data if it doesn't exist.
 *
 * @param select: function(getState, props, context){...}
 * @param options: {subscribe: true}
 * @returns Function to pass to the component to be decorated
 *
 * Example usage:
 *
 * Scenario 1: If the component doesn't need to be subscribed to changes in the store (which
 * is the typical scenario) just pass in one argument; the state function and the component:
 *
 * connect(function(getState, props, context){
 *   return {
 *     user: getState('user.current')
 *   }
 * })(createReactClass({...}))
 *
 * Scenario 2: If the component does need to be subscribed to changes in the store, pass in
 * two arguments; the state function and options.
 *
 * connect(function(getState, props, context){
 *    return {
 *       user: getState('user.current')
 *    }
 * }, {
 *    subscribe: true
 * })(createReactClass({...})
 *
 */

export function connect(select, options = {}) {
  const actions = useContext(ActionsContext);
  const blueprints = useContext(BlueprintsContext);
  const reducerActionMap = useContext(ReducerActionMapContext);
  const store = useContext(StoreContext);

  const getState = function(stateKey, params, options) {
    const state = store.getState();
    const connection = getConnection(stateKey, reducerActionMap, actions, blueprints);
    return connection.getState(state, params, options);
  };

  return function(DecoratedComponent) {
    const displayName = `Connect(${getDisplayName(DecoratedComponent)})`;

    return createReactClass({
      displayName: displayName,

      contextTypes: _.merge({
        store: storeShape.isRequired
      }, options.contextTypes),

      getInitialState: function () {
        // provide a decorator over getState that will force data to be fetched on
        // mount if desired
        const initialState = this.selectState(
          this.props,
          this.context,
          function getStateOnMount(state, stateKey, params, options = {}) {
            return getState(state, stateKey, params, _.assign({}, options, {
              force: options.forceFetchOnMount
            }));
          }
        );

        this.nextState = initialState;
        return {};
      },

      shouldComponentUpdate: function (nextProps) {
        const nextState = this.selectState(nextProps, this.context, getState);
        this.nextState = nextState;
        return true;
      },

      componentDidMount: function () {
        this.isMounted = true;

        if (!options.subscribe) {
          return;
        }

        this.unsubscribe = this.context.store.subscribe(function () {
          const nextState = this.selectState(this.props, this.context, getState);

          // There's no guarantee the component will still be mounted, when this
          // callback is invoked, so we need to check before updating state
          if (this.isMounted) {
            this.setState(nextState);
          }
        }.bind(this));
      },

      componentWillUnmount: function () {
        this.isMounted = false;

        if (this.unsubscribe) {
          this.unsubscribe();
        }
      },

      selectState: function (props, context, getState) {
        const state = context.store.getState();
        const slice = select(getState.bind(null, state), props, context);

        invariant(
          _.isPlainObject(slice),
          'The return value of `select` prop must be an object. Instead received %s.',
          slice
        );

        return slice;
      },

      render: function () {
        return React.createElement(
          DecoratedComponent,
          _.assign({}, this.nextState, this.props)
        );
      }
    });
  };
}

export default connect;
