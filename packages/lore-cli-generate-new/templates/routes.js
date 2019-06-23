import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/**
 * The AuthenticatedRoute provides an easy way to redirect the user
 * to a login experience if we don't know who they are.
 */

import AuthenticatedRoute from './src/routes/AuthenticatedRoute';

/**
 * Routes are used to declare your view hierarchy
 * See: https://reacttraining.com/react-router/web/guides/quick-start
 */

import HomeLayout from './src/pages/Layout';
import NotFoundPage from './src/pages/NotFound';

export default (
  <Switch>
    <AuthenticatedRoute exact path="/" component={HomeLayout} />
    <Route component={NotFoundPage} />
  </Switch>
);
