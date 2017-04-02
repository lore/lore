var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Header',

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top header">
        <div className="container">
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to="/">
              Webpack Sandbox
            </Router.Link>
          </div>
        </div>
      </nav>
    );
  }

});
