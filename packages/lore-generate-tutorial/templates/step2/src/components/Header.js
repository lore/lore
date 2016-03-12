var React = require('react');

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              Guessatron 5000
            </a>
          </div>
        </div>
      </nav>
    );
  }
});
