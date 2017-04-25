var React = require('react');
var Route = require('react-router').Route;

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
var Login  = require('./src/components/Login');
var Logout = require('./src/components/Logout');

module.exports = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />

    <Route component={UserIsAuthenticated(Master)}>
      <Route path="/" component={Layout} />
    </Route>
  </Route>
);
