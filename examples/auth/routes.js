var React = require('react');
var Route = require('react-router').Route;

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Layout = require('./src/components/Layout');
var Login  = require('./src/components/Login');
var Logout = require('./src/components/Logout');

var UserIsAuthenticated = require('./src/decorators/auth/UserIsAuthenticated');

module.exports = (
  <Route>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />

    <Route component={UserIsAuthenticated(Master)}>
      <Route path="/" component={Layout} />
    </Route>
  </Route>
);
