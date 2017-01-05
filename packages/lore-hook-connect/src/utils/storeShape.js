var React = require('react');

module.exports = React.PropTypes.shape({
  subscribe: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  getState: React.PropTypes.func.isRequired
});
