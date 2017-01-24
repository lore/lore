var React = require('react');
var Router = require('react-router');
var AuthGeneratorFactory = require('../factories/AuthGeneratorFactory');
var _ = require('lodash');
var url = require('url');

function isFullyQualifiedUrl(url) {
  return (
    _.startsWith(url, 'https://') ||
    _.startsWith(url, 'http://')
  );
}

function redirectToExternalUrl(pathname, query) {
  var uri = url.parse(pathname);
  uri.query = query;
  window.location = uri.format();
}

module.exports = function(options) {
  var defaults = {
    wrapperDisplayName: 'UserIsAuthenticated',

    propTypes: {
      location: React.PropTypes.shape({
        pathname: React.PropTypes.string.isRequired,
        search: React.PropTypes.string.isRequired
      }).isRequired,
      router: React.PropTypes.object.isRequired
    },

    redirectUrl: '/login',

    redirectQueryParamName: 'redirect',

    predicate: function (storeState) {
      return this.isAuthenticated();
    },

    isAuthenticated: function () {
      return false;
    },

    onFailure: function () {
      this.redirectToLoginPage();
    },

    redirectToLoginPage: function () {
      var location = this.props.location;
      var router = this.props.router;
      var redirectUrl = this.redirectUrl;
      var redirectQueryParamName = this.redirectQueryParamName;

      // create the new route, composed of where we want to go and where we
      // are now (so we can come back to this point after user is logged in)
      var route = {
        pathname: redirectUrl,
        query: {}
      };
      route.query[redirectQueryParamName] = `${location.pathname}${location.search}`;

      // use window.location instead of React Router if the link is fully qualified
      // React Router doesn't handle fully qualified URLs
      if (isFullyQualifiedUrl(redirectUrl)) {
        redirectToExternalUrl(route.pathname, route.query);
      } else {
        router.replace(route);
      }
    }

  };

  var properties = _.defaultsDeep({}, options, defaults);

  return AuthGeneratorFactory(properties, Router.withRouter);
};
