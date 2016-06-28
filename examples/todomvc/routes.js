var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Home = require('./src/components/Home');

module.exports = (
  <Route>
    <Redirect from="/" to="/todos" query={{filter: 'all'}} />
    <Route path="/" component={Master}>
      <Route path="todos" component={Home} />
    </Route>
  </Route>
);
