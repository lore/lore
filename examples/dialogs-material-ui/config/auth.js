/**
 * Configuration file for authentication
 *
 * This file is where you define overrides for the default authentication behaviors.
 */

module.exports = {

  /**
   * The name of the model with a URL property set to the endpoint
   * that can return the current user.
   */

  modelName: 'currentUser'

  /**
   * The name of the reducer that should be created that is responsible
   * for storing the current user. This defaults to the name of the
   * model.
   */

  // reducerName: 'currentUser'

  /**
   * The name of the action that should be created that is responsible
   * for fetching the current user. This defaults to the name of the
   * model.
   */

  // actionName: 'currentUser'

};
