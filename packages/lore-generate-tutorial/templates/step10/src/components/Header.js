var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Router.Link to={'/'} className="navbar-brand">
              Guessatron 5000
            </Router.Link>
          </div>
        </div>
      </nav>
    );
  }
});
