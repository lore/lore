var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
var UserIsAuthenticated = require('./src/decorators/UserIsAuthenticated');

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
    <Route path="/" component={UserIsAuthenticated(Master)}>
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
