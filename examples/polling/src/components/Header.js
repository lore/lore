var React = require('react');
var Router = require('react-router');
var CreateButton = require('./CreateButton');

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {},

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top header">
        <div className="container">
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to="/">
              Polling
            </Router.Link>
          </div>
          <CreateButton/>
        </div>
      </nav>
    );
  }

});
