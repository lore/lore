module.exports = {
  utils: require('./utils'),
  blueprints: {
    create: require('./blueprints/create'),
    destroy: require('./blueprints/destroy'),
    get: require('./blueprints/get'),
    find: require('./blueprints/find'),
    update: require('./blueprints/update')
  }
};
