module.exports = {
  blueprints: {
    dispatchers: {
      created: require('./blueprints/dispatchers/created'),
      updated: require('./blueprints/dispatchers/updated'),
      destroyed: require('./blueprints/dispatchers/destroyed')
    }
  },
  WebSocketConnection: require('./WebSocketConnection')
};
