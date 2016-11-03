var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Layout = require('./src/components/Layout');
var Feed = require('./src/components/Feed');

module.exports = (
  <Route component={Master}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Feed} />
    </Route>
  </Route>
);
