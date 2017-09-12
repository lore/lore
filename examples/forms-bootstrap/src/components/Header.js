var React = require('react');
var Router = require('react-router');
var HeaderLink = require('./HeaderLink');

module.exports = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Router.Link className="navbar-brand" to={{pathname: '/'}}>
              Bootstrap Sandbox
            </Router.Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <HeaderLink to="/tweets">Tweets</HeaderLink>
              <HeaderLink to="/users">Users</HeaderLink>
              <HeaderLink to="/autocomplete">AutoComplete</HeaderLink>
              <HeaderLink to="/select">Select</HeaderLink>
              <HeaderLink to="/validated">ValidatedInput</HeaderLink>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
