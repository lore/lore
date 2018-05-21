import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/ReactTraining/react-router/blob/v3/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';
import Feed from './src/components/Feed';

export default (
  <Route component={UserIsAuthenticated(Master)}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Feed} />
    </Route>
  </Route>
);
