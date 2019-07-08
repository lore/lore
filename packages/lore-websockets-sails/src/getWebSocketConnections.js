import _ from 'lodash';
import pluralize from 'pluralize';
import { blueprints } from '@lore/websockets';
import { SailsWebSocketConnection } from '@lore/websockets-sails';

export function getWebSocketConnections(config={}, resources={}) {
  const {
    websockets: {
      serverUrl: _serverUrl,
      // namespace: '',
      // event: '',
      pluralize: _pluralize
    }
  } = config;

  const { models, store } = resources;

  /*
   * Generate default set of connections for all models using blueprints
   */

  const connections = {};

  Object.keys(models).forEach(function(modelName) {
    const Model = models[modelName];

    /**
     * Establish conventions for the namespace and event to listen for
     */

    const conventions = {
      namespace: _pluralize ? `/${pluralize(modelName)}` : `/${modelName}`,
      event: modelName
    };

    /**
     * Create the default dispatchers from blueprints
     */

    const dispatchers = {
      created: blueprints.dispatchers.created(modelName, Model)(store),
      updated: blueprints.dispatchers.updated(modelName, Model)(store),
      destroyed: blueprints.dispatchers.destroyed(modelName, Model)(store)
    };

    /**
     * There are currently no actions provided by default
     */

    const actions = {};

    /**
     * Override the defaults with any user provided configuration
     *
     * Key properties:
     *
     * serverUrl
     * namespace
     * event
     */

    const CustomSailsWebSocketConnection = SailsWebSocketConnection.extend(_.extend(
      conventions,
      config.websockets
    ));

    /**
     * Create the websocket connection for the model
     */

    connections[modelName] = new CustomSailsWebSocketConnection(dispatchers, actions);
  });

  return connections;
}
