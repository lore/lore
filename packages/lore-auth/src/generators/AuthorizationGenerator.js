import _ from 'lodash';
import AuthGeneratorFactory from '../factories/AuthGeneratorFactory';

export default function(options) {
  const defaults = {
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

  const properties = _.defaultsDeep({}, options, defaults);

  return AuthGeneratorFactory(properties);
}
