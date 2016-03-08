var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: '<%= componentName %>',

  mixins: [Router.History],

  propTypes: {},

  render: function () {
    return (
      <div></div>
    );
  }
});
