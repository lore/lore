module.exports = {

  /**
   * Root URL of the WebSocket server
   */
  serverUrl: 'http://localhost:1337'

  /**
   * Override to change how the websocket instance is created
   * that is capable of subscribing to events published by
   * the respective server implementation.
   */
  // initialize: function() {},

  /**
   * Override to change how the websocket instance establishes
   * a connection with the server. This method is responsible
   * for making sure the websocket instance connects to the
   * proper namespace.
   */
  // connect: function() {},

  /**
   * NOT IMPLEMENTED YET: In future will be called once the
   * connection to the server is established.
   */
  // onConnect: function() {},

  /**
   * Override to change how the websocket instance subscribes
   * to data. This method is responsible for making sure the
   * websocket instance is listening for events that provide
   * the CRUD data needed for updating the application based
   * on the activity of other users.
   */
  // subscribe: function() {},

  /**
   * NOT IMPLEMENTED YET: In future will be called once the
   * client starts listening for events.
   */
  // onSubscribe: function() {},

  /** Override to change how the websocket instance unsubscribes
   * to data. This method is responsible for making sure the
   * websocket instance stops listening for events.
   */
  // unsubscribe: function() {},

  /**
   * NOT IMPLEMENTED YET: In future will be called once the
   * client stops listening for events.
   */
  // onUnsubscribe: function() {},

  /**
   * Override if you need to modify the message before providing
   * it to a dispatcher. This will be the case if your messages
   * don't conform to the data structure the hooks use by default,
   * which is:
   *
   * CREATED:   { verb:'created',   data: {...} }
   * UPDATED:   { verb:'updated',   data: {...} }
   * DESTROYED: { verb:'destroyed', data: {...} }
   */
  // parse: function(message) {
  //   return message;
  // },

  /**
   * Override if you need to change the way a message is given
   * to a dispatcher (or which dispatcher it is given to)
   */
  // dispatch: function(message) {
  //   var parsedMessage = this.parse(message);
  //   var verb = parsedMessage.verb;
  //   var dispatcher = this.dispatchers[verb];
  //
  //   if (dispatcher) {
  //     dispatcher(parsedMessage);
  //   }
  // }

};
