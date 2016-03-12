/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <div>
        <h1>Welcome to Lore!</h1>
        <h2>One day there will be a helpful homepage here, but not today.</h2>
      </div>
    );
  }

});
