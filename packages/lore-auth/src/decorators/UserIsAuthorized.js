var React = require('react');
var AuthorizationGenerator = require('../generators/AuthorizationGenerator');
var _ = require('lodash');

module.exports = function(isAuthorized) {
  var properties = {
    wrapperDisplayName: 'UserIsAuthorized',

    isAuthorized: function (storeState) {
      return isAuthorized(this.props, storeState);
    }
  };

  return AuthorizationGenerator(properties);
};
