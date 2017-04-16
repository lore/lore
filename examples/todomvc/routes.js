var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
var UserIsAuthenticated = require('./src/decorators/UserIsAuthenticated');

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Layout = require('./src/components/Layout');

module.exports = (
  <Route>
    <Redirect from="/" to="/todos" query={{filter: 'all'}} />
    <Route path="/" component={UserIsAuthenticated(Master)}>
      <Route path="todos" component={Layout} />
    </Route>
  </Route>
);
