var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to={{pathname: '/'}}>
              Pagination
            </Router.Link>
          </div>
        </div>
      </nav>
    );
  }
});
