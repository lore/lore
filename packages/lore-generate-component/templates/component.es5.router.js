var React = require('react');
var Router = require('react-router');

module.exports = Router.withRouter(React.createClass({
  displayName: '<%= componentName %>',

  propTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <div></div>
    );
  }
}));
