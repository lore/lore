module.exports = {

  // decorators
  UserIsAuthorized: require('./decorators/UserIsAuthorized'),

  // generator factories
  AuthGeneratorFactory: require('./factories/AuthGeneratorFactory'),

  // generators
  AuthenticationGenerator: require('./generators/AuthenticationGenerator'),
  AuthorizationGenerator: require('./generators/AuthorizationGenerator')

};
