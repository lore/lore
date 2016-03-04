import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Home = require('./src/components/Home');

module.exports = (
  <Route path="/" component={Master}>
    <IndexRoute component={Home} />
  </Route>
);
