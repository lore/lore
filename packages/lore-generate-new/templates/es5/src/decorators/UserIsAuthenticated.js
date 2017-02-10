/**
 * This file provides a higher order component that you can use to block
 * access to the application (or some part of it) if the user is not logged
 * in.
 *
 * When this component is "rendered", the 'isAuthenticated' method will be
 * invoked. If it returns true, nothing happens, and the application will
 * render as if this decorator doesn't exist. But if 'isAuthenticated'
 * returns false, the application will redirect the user to the 'redirectUrl'.
 *
 * See this URL for more information:
 * https://github.com/lore/lore/tree/master/packages/lore-auth
 */

var React = require('react');
var AuthenticationGenerator = require('lore-auth').AuthenticationGenerator;

module.exports = AuthenticationGenerator({
  wrapperDisplayName: 'UserIsAuthenticated',

  // redirectUrl: '/login',

  // redirectQueryParamName: 'redirect',

  isAuthenticated: function() {
    return true;
  }
});
