var React = require('react');

module.exports = React.createClass({
  displayName: 'Spinner',

  render: function () {
    return (
      <svg
        className="spinner"
        viewBox="0 0 66 66">
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30" />
      </svg>
    );
  }

});
