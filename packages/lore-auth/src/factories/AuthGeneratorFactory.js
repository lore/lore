var React = require('react');
var _ = require('lodash');
var getDisplayName = require('../utils/getDisplayName');

module.exports = function(options, Decorator) {
  return function (DecoratedComponent) {
    var displayName = getDisplayName(DecoratedComponent);
    var displayWrapperName = options.displayWrapperName || 'AuthDecorator';

    var defaults = {
      displayName: `${displayWrapperName}(${displayName})`,

      contextTypes: {
        store: React.PropTypes.object.isRequired
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
        var storeState = this.context.store.getState();
        var hasPermission = this.predicate(storeState);

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
        var hasPermission = this.state.hasPermission;

        if (hasPermission) {
          return this.renderSuccess();
        }

        return this.renderFailure();
      }

    };

    var properties = _.assign(defaults, options);

    if (Decorator) {
      return Decorator(
        React.createClass(properties)
      );
    } else {
      return React.createClass(properties);
    }
  }
};
