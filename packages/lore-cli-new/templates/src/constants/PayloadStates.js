/**
 * This file contains the default PayloadStates that Lore uses for the
 * action and reducer blueprints. It is also where you should store any
 * custom PayloadStates required for your application, if you create
 * custom actions or reducers that require them.
 */

import { PayloadStates } from '@lore/utils';

export default {

  /**
   * Include the default PayloadStates used by the action and reducer
   * blueprints. Explanations for each default state are provided below.
   */

  ...PayloadStates,

  /**
   * INITIAL_STATE
   *
   * This is the default state for reducers that haven't been initialized
   * with data yet. As long as you're using the action blueprints, you'll
   * never see this state in the application.
   */

  // INITIAL_STATE: 'INITIAL_STATE',

  /**
   * RESOLVED
   *
   * This state means the data is stable, and there are no pending operations
   * acting on it such as creating, updating, deleting, etc.
   */

  // RESOLVED   : 'RESOLVED',

  /**
   * NOT_FOUND
   *
   * This state means a resource was fetched from the API, such as /users/1,
   * but that resource returned a 404 NOT FOUND.
   */

  // NOT_FOUND: 'NOT_FOUND',

  /**
   * DELETED
   *
   * This state means some piece of data was deleted, like /users/1. Lore does
   * not automatically remove data from store when it's deleted, because it
   * would make it difficult to *show* the user the data was deleted. Instead
   * the state is updated to DELETED, and you can choose to filter out deleted
   * resources in the UI (or update the blueprint behavior to change this default).
   */

  // DELETED: 'DELETED',

  /**
   * CREATING/UPDATING/DELETING/FETCHING
   *
   * These are the primary transition states. Invoking the create action will
   * produce a resource with the state CREATING. Once the resource has been
   * confirmed to be created by the server, the state will change to RESOLVED.
   */

  // CREATING: 'CREATING',

  /**
   * UPDATING
   *
   * Invoking the 'update' action will produce a resource with the state
   * UPDATING. Once the resource has been updated by the server the state will
   * change to RESOLVED. If the resource was not found, the state will be NOT_FOUND.
   */

  // UPDATING: 'UPDATING',

  /**
   * DELETING
   *
   * Invoking the 'destroy' action will produce a resource with the state
   * DELETING. Once the resource has been deleted by the server the state will
   * change to DELETED. If the resource was not found, the state will be NOT_FOUND.
   */

  // DELETING: 'DELETING',

  /**
   * FETCHING
   *
   * Invoking the 'find' or 'get' action will produce a resource with the
   * state FETCHING. Once the resource has been fetched the state will change
   * to RESOLVED. If the resource was not found, the state will be NOT_FOUND.
   */

  // FETCHING: 'FETCHING',

  /**
   * ERROR States
   *
   * If any of the actions receive a 400 or 500 level status code from the
   * server (excluding a 404), the state will be one of the ERROR states below.
   * For example, if the 'create' action returns a 409 CONFLICT, the state will
   * be changed to ERROR_CREATING. If the 'update' action returns a 500 INTERNAL
   * SERVER ERROR, the state will be changed to ERROR_UPDATING.
   */

  // ERROR_CREATING: 'ERROR_CREATING',
  // ERROR_UPDATING: 'ERROR_UPDATING',
  // ERROR_DELETING: 'ERROR_DELETING',
  // ERROR_FETCHING: 'ERROR_FETCHING',

  /**
   * MANAGED
   *
   * This state exists to support very rare edge cases where the state of data
   * can't be accurately represented by any of the above states.
   *
   * The motivation for adding it came from a challenge where an API was not
   * entirely database-driven, and the client-side needed to account for a
   * challenge where there was a delay between when the API said it updated data
   * and when that updated data was actually viewable via a GET request.
   */

  // MANAGED: 'MANAGED'
}
