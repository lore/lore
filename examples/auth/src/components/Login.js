var React = require('react');
var Router = require('react-router');
var auth = require('../auth');
var Auth0Lock = require('auth0-lock').default;
var lock = null;

module.exports = Router.withRouter(React.createClass({
  displayName: 'Login',

  propTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    // If the user is not logged in, show the dialog
    if (!auth.isLoggedIn()) {
      return this.showLogin();
    }

    return this.navigateBackToApp();
  },

  componentWillUnmount: function() {
    var lock = this.getLock();
    lock.hide();
  },

  getLock: function(){
    var clientId = lore.config.auth0.clientId;
    var domain = lore.config.auth0.domain;

    // The lock needs to be a singleton. Otherwise, there's situations where this
    // component can get mounted twice in quick secession, and their will be a login
    // widget stacked on the login widget.  Once the user completes the first one, it
    // disappears, but the second widget overlays the application.
    if(!lock) {
      lock = new Auth0Lock(clientId, domain, {
        auth: {
          redirect: false,
          sso: false,
          params: {scope: 'openid name email'}
        },
        languageDictionary: {
          title: "LoreJS Auth Example"
        }
      });
    }
    return lock;
  },

  navigateBackToApp: function() {
    var location = this.props.location;
    var url = location.query && location.query.redirect || '/';
    this.props.router.push(url);
  },

  onAuthentication: function(authResult) {
    auth.login(authResult.idToken);
    this.navigateBackToApp();
  },

  onAuthenticationError: function(error) {
    alert('There was an error logging in' + error);
  },

  showLogin: function(){
    var lock = this.getLock();
    lock.on('authenticated', this.onAuthentication);
    lock.on('authorization_error', this.onAuthenticationError);
    lock.show();
  },

  render: function() {
    return (
      <div/>
    );
  }

}));
