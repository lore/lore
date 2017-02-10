var React = require('react');
var Router = require('react-router');

module.exports = lore.connect(function(getState, props) {
    return {
      //models: getState('model.find')
    }
  })(
  Router.withRouter(React.createClass({
    displayName: '<%= componentName %>',

    propTypes: {
      //models: React.PropTypes.object.isRequired,
      router: React.PropTypes.object.isRequired
    },

    render: function() {
      return (
        <div></div>
      );
    }
  }))
);
