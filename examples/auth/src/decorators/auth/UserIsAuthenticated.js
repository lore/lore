var React = require('react');
var AuthenticationGenerator = require('lore-auth').AuthenticationGenerator;
var auth = require('../../auth');

module.exports = AuthenticationGenerator({
  wrapperDisplayName: 'UserIsAuthenticated',

  // redirectUrl: '/login',

  // redirectQueryParamName: 'redirect',

  isAuthenticated: function () {
    return auth.isLoggedIn();
  }
});
