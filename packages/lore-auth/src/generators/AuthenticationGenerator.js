import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function(options) {
  return function (DecoratedComponent) {
    const decoratorDisplayName = options.displayName || 'UserIsAuthenticated';
    const displayName = getDisplayName(DecoratedComponent);

    return createReactClass(_.defaults({}, options, {
      displayName: `${decoratorDisplayName}(${displayName})`,

      propTypes: {
        router: PropTypes.object.isRequired
      },

      componentWillMount() {
        const isAuthenticated = this.isAuthenticated();

        if (!isAuthenticated) {
          this.redirect();
        }

        this.setState({
          isAuthenticated: isAuthenticated
        });
      },

      isAuthenticated() {
        return true;
      },

      redirect() {
        console.log('redirect() not implemented')
      },

      render: function () {
        const { isAuthenticated } = this.state;

        if (isAuthenticated) {
          return (
            <DecoratedComponent {...this.props} />
          );
        }

        return null;
      }
    }));
  };
}
