/**
 * app/src/constants/PayloadStates.js
 *
 * This file is where you should store any custom PayloadStates required for
 * your application.  It is populated by default with the PayloadStates that
 * Lore uses for the action and reducer blueprints.
 **/

import { PayloadStates } from 'lore-utils';
import _ from 'lodash';

/**
 * PayloadStates are how you can tell what's happening to a resource within your
 * application.  For example, all data passed around a Lore app has the following
 * format:
 *
 * const datum = {
 *   id: '1',
 *   cid: 'c1',
 *   state: [PayloadState],
 *   data: {
 *     title: 'Explain PayloadStates',
 *     isCompleted: false
 *   },
 *   error: {..some error object..}
 * }
 *
 * The `state` field always contains one of the PayloadState properties, like
 * `FETCHING` or `UPDATING`.
 *
 * This structure allows your components to be able to know and react to transitionary
 * states within your data.  For example, if a component gets some data that has
 * a `state` of `FETCHING`, it will know the data is currently being retrieved from
 * the server and it should maybe show a spinner or some other kind of waiting message.
 *
 * If the `state` is `RESOLVED`, the component will know the data is stable (nothing in
 * flight) and if the `state` is `UPDATING` it would know that the application is currently
 * waiting on confirmation from the server about a change to the data.
 *
 * The `ERROR_*` states exist in case there's an error performing an operation on the server
 * side and you want to articulate to the user what failed (Create, Update, Delete, etc.) and
 * perhaps give them an opportunity to modify the request and try again.
 **/

/*
 * The default payload states are listed below.
 */

export default _.defaults({
  // INITIAL_STATE: 'INITIAL_STATE',
  //
  // RESOLVED   : 'RESOLVED',
  // NOT_FOUND: 'NOT_FOUND',
  // DELETED: 'DELETED',
  //
  // CREATING: 'CREATING',
  // UPDATING: 'UPDATING',
  // DELETING: 'DELETING',
  // FETCHING: 'FETCHING',
  //
  // ERROR_CREATING: 'ERROR_CREATING',
  // ERROR_UPDATING: 'ERROR_UPDATING',
  // ERROR_DELETING: 'ERROR_DELETING',
  // ERROR_FETCHING: 'ERROR_FETCHING'
}, PayloadStates);
