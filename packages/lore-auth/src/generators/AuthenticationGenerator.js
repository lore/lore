/* global window */
/* eslint no-unused-vars: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import url from 'url';
import { withRouter } from 'react-router';
import AuthGeneratorFactory from '../factories/AuthGeneratorFactory';

function isFullyQualifiedUrl(value) {
  return (
    _.startsWith(value, 'https://') ||
    _.startsWith(value, 'http://')
  );
}

function redirectToExternalUrl(pathname, query) {
  const uri = url.parse(pathname);
  uri.query = query;
  window.location = uri.format();
}

export default function(options) {
  const defaults = {
    wrapperDisplayName: 'UserIsAuthenticated',

    propTypes: {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired
      }).isRequired,
      router: PropTypes.object.isRequired
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
      const location = this.props.location;
      const router = this.props.router;
      const redirectUrl = this.redirectUrl;
      const redirectQueryParamName = this.redirectQueryParamName;

      // create the new route, composed of where we want to go and where we
      // are now (so we can come back to this point after user is logged in)
      const route = {
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

  const properties = _.defaultsDeep({}, options, defaults);

  return AuthGeneratorFactory(properties, withRouter);
}
