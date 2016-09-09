/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

var React = require('react');
var Router = require('react-router');
var Header = require('./Header');
var List = require('./List');
var Profile = require('./Profile');

module.exports = Router.withRouter(React.createClass({
  displayName: 'Layout',

  logout: function() {
    this.props.router.push('/logout');
  },

  render: function() {
    var location = this.props.location;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Profile />
            </div>
            <div className="col-md-offset-1 col-md-6">
              <List location={location} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}));
