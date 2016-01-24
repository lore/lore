import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'

var Master = require('../src/components/Master');
var Home = require('../src/components/Home');

module.exports = {

  /****************************************************************************
  *                                                                           *
  * Whether browser should use pushState or hash to keep track of routes      *
  * See: https://github.com/rackt/history                                     *
  *                                                                           *
  ****************************************************************************/

  history: createHashHistory(),

  /****************************************************************************
  *                                                                           *
  * Routes are used to declare your view hierarchy                            *
  * See: https://github.com/rackt/react-router/blob/master/docs/API.md        *
  *                                                                           *
  ****************************************************************************/

  routes: (
    <Route path="/" component={Master}>
      <IndexRoute component={Home} />
    </Route>
  )

};
