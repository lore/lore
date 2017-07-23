/* eslint no-shadow: "off" */
/* eslint react/no-is-mounted: "warn" */

import React from 'react';
import _ from 'lodash';
import invariant from 'invariant';
import storeShape from './utils/storeShape';
import getDisplayName from './utils/getDisplayName';
import _getState from './getState';

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
 * })(React.createClass({...}))
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
 * })(React.createClass({...})
 *
 */

export default function(actions, blueprints, reducerActionMap) {
  // provide getState with a copy of lore so it can access reducer-action map
  const getState = _getState(actions, blueprints, reducerActionMap);

  return function connect(select, options = {}) {
    return function(DecoratedComponent) {
      const displayName = `Connect(${getDisplayName(DecoratedComponent)})`;

      return React.createClass({
        displayName: displayName,

        contextTypes: {
          store: storeShape.isRequired
        },

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
            _.assign({ ref: 'decoratedComponent' }, this.nextState, this.props)
          );
        }
      });
    };
  };
}
