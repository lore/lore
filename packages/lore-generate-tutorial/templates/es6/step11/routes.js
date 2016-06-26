import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';
import Guessatron from './src/components/Guessatron';

export default (
  <Route component={Master}>
    <Route path="/" component={Layout}>
      <Route path="colors/:colorId" component={Guessatron} />
    </Route>
  </Route>
);
