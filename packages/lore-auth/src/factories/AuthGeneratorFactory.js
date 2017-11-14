import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import getDisplayName from '../utils/getDisplayName';

export default function(options, Decorator) {
  return function (DecoratedComponent) {
    const displayName = getDisplayName(DecoratedComponent);
    const displayWrapperName = options.displayWrapperName || 'AuthDecorator';

    const defaults = {
      displayName: `${displayWrapperName}(${displayName})`,

      contextTypes: {
        store: PropTypes.object.isRequired
      },

      predicate: function (storeState) {
        return true;
      },

      onSuccess: function () {
        // no op
      },

      onFailure: function () {
        // no op
      },

      // Redirect if not authenticated
      componentWillMount: function () {
        const storeState = this.context.store.getState();
        const hasPermission = this.predicate(storeState);

        if (hasPermission) {
          this.onSuccess();
        } else {
          this.onFailure();
        }

        this.setState({
          hasPermission: hasPermission
        });
      },

      renderSuccess: function() {
        return (
          <DecoratedComponent {...this.props} />
        );
      },

      renderFailure: function() {
        return (
          <div>Failure!</div>
        );
      },

      render: function () {
        const hasPermission = this.state.hasPermission;

        if (hasPermission) {
          return this.renderSuccess();
        }

        return this.renderFailure();
      }

    };

    const properties = _.defaultsDeep({}, options, defaults);

    if (Decorator) {
      return Decorator(
        createReactClass(properties)
      );
    }

    return createReactClass(properties);
  };
}
