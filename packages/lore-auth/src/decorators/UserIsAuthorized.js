import AuthorizationGenerator from '../generators/AuthorizationGenerator';

export default function(isAuthorized) {
  const properties = {
    wrapperDisplayName: 'UserIsAuthorized',

    isAuthorized: function (storeState) {
      return isAuthorized(this.props, storeState);
    }
  };

  return AuthorizationGenerator(properties);
}
