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
import Logout from './src/components/Logout';
import AuthCallback from './src/components/AuthCallback';
import UserTweets from './src/components/UserTweets';

export default (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/auth/callback" component={AuthCallback} />

    <AuthenticatedRoute exact path="/" component={Feed} />
    <AuthenticatedRoute exact path="/users/:userId" component={UserTweets} />
    <Route component={NotFoundPage} />
  </Switch>
);
