/**
 * Configuration file for actions
 *
 * This file is where you define overrides for the default action behaviors.
 */

export default {

  /**
   * Determines whether the client-side id (the cid attribute in a model)
   * is sent to the server when creating data. This is not necessary when
   * interacting with REST APIs as the actions can associate the associate
   * the request and response, but when performing optimistic updates using
   * WebSockets it is neccesary to send a client-generated ID to the server
   * in order to associate the data created on the client side with the data
   * broadcasted by the server.
   */

  // addCidToBody: false,

  /**
   * This field let's you change the name of the cid field sent to the server
   * when performing optimistic updates through WebSockets. By default the
   * property send to the server is called `cid`, matching the name of the attribute
   * on the client-side, but you can change if you need to to match the API.
   */

  // cidBodyAttributeName: 'cid'

}
