var React = require('react');

module.exports = React.createClass({
  displayName: 'Master',

  render: function() {
    return (
      <div>{this.props.children}</div>
    );
  }
});
