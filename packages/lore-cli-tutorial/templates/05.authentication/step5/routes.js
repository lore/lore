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

import NotFoundPage from './src/components/NotFound';
import Feed from './src/components/Feed';
import Login from './src/components/Login';
import AuthCallback from './src/components/AuthCallback';

export default (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/auth/callback" component={AuthCallback} />

    <AuthenticatedRoute exact path="/" component={Feed} />
    <Route component={NotFoundPage} />
  </Switch>
);
