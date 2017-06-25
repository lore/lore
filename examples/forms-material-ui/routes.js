var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;
var withMuiTheme = require('./src/decorators/withMuiTheme').default;

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
var Users = require('./src/components/users/Layout');
var Tweets = require('./src/components/tweets/Layout');

module.exports = (
  <Route component={UserIsAuthenticated(withMuiTheme(Master))}>
    <Redirect path="/" to="/tweets" />
    <Route path="/" component={Layout}>
      <IndexRoute component={Tweets} />
      <Route path="tweets" component={Tweets} />
      <Route path="tweets/:tweetId" component={Tweets} />
      <Route path="users" component={Users} />
      <Route path="users/:userId" component={Users} />
    </Route>
  </Route>
);
