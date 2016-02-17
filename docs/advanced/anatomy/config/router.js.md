# app/config/router.js

### Purpose

This file is where you define overrides for the default routing behavior.  Currently this includes how you want your
routing display (using hash history or push state) as well as where you specify the routes for your application.

```js
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
```
