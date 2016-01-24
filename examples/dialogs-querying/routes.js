import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
var Master = require('./src/components/Master');
var Layout = require('./src/components/Layout');
var Lists = require('./src/components/lists/Lists');
var Todos = require('./src/components/todos/Todos');
var NoListSelectedView = require('./src/components/NoListSelectedView');

module.exports = (
  <Route>
    <Redirect from="/" to="/lists" />
    <Route path="/" component={Master}>
      <Route path="lists" component={Layout}>
        <IndexRoute components={{
          leftPanel: Lists,
          rightPanel: NoListSelectedView
        }}/>
        <Route path=":listId" components={{
          leftPanel: Lists,
          rightPanel: Todos
        }}/>
      </Route>
    </Route>
  </Route>
);
