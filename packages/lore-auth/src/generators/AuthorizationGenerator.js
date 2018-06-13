import React from 'react';
import createReactClass from 'create-react-class';
// import PropTypes from 'prop-types';
import _ from 'lodash';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function(options) {
  return function (DecoratedComponent) {
    const decoratorDisplayName = options.displayName || 'UserIsAuthorized';
    const displayName = getDisplayName(DecoratedComponent);

    return createReactClass(_.defaults({}, options, {
      displayName: `${decoratorDisplayName}(${displayName})`,

      componentWillMount() {
        const isAuthorized = this.isAuthorized();

        this.setState({
          isAuthorized: isAuthorized
        });
      },

      componentWillReceiveProps(nextProps) {
        const isAuthorized = this.isAuthorized();

        this.setState({
          isAuthorized: isAuthorized
        });
      },

      isAuthorized() {
        return true;
      },

      render: function () {
        const { isAuthorized } = this.state;

        if (isAuthorized) {
          return (
            <DecoratedComponent {...this.props} />
          );
        }

        return null;
      }
    }));
  };
}
