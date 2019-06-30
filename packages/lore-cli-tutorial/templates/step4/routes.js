import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';
import Feed from './src/components/Feed';

export default (
  <Route component={Master}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Feed} />
    </Route>
  </Route>
)
