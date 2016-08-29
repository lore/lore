var React = require('react');
var AuthGeneratorFactory = require('../factories/AuthGeneratorFactory');
var _ = require('lodash');

module.exports = function(options) {
  var defaults = {
    wrapperDisplayName: 'UserIsAuthorized',

    predicate: function (storeState) {
      return this.isAuthorized(storeState);
    },

    isAuthorized: function (storeState) {
      return false;
    },

    renderFailure: function () {
      return null;
    }

  };

  var properties = _.assign(defaults, options);

  return AuthGeneratorFactory(properties);
};
