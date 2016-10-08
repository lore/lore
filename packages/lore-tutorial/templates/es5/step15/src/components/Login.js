var React = require('react');
var Auth0Lock = require('auth0-lock').default;
var auth = require('../auth');
var Router = require('react-router');
var lock = null;

module.exports = Router.withRouter(React.createClass({
  displayName: 'Login',

  componentDidMount: function() {
    this.showLogin();
  },

  componentWillUnmount: function() {
    var lock = this.getLock();
    lock.hide();
  },

  getLock: function(){
    var clientId = lore.config.auth0.clientId;
    var domain = lore.config.auth0.domain;

    // Because the lock injects elements into the DOM outside the control of
    // React, we should treat it as a singleton in order to prevent visual
    // side-effects where multiple background overlays can appear if you navigate
    // to /login multiple times without refreshing the browser in between.
    if(!lock) {
      lock = new Auth0Lock(clientId, domain, {
        auth: {
          redirect: false,
          sso: false,
          params: {scope: 'openid name email'}
        },
        languageDictionary: {
          title: "Lore Tutorial"
        }
      });
    }

    return lock;
  },

  navigateBackToApp: function() {
    this.props.router.push('/');
  },

  onAuthentication: function(authResult) {
    auth.login(authResult.idToken);
    this.navigateBackToApp();
  },

  showLogin: function(){
    var lock = this.getLock();
    lock.on('authenticated', this.onAuthentication);
    lock.show();
  },

  render: function() {
    return (
      <div/>
    );
  }

}));
