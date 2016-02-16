module.exports = {
  utils: require('./utils'),
  blueprints: {
    create: require('./blueprints/create'),
    destroy: require('./blueprints/destroy'),
    fetch: require('./blueprints/fetch'),
    fetchAll: require('./blueprints/fetchAll'),
    update: require('./blueprints/update')
  }
};
