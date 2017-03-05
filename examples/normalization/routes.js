var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

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
var Feed = require('./src/components/Feed');
var SingleTweet = require('./src/components/SingleTweet');

module.exports = (
  <Route component={UserIsAuthenticated(Master)}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Feed} />
      <Route path="tweets/:tweetId" component={SingleTweet} />
    </Route>
  </Route>
);
