import React from 'react';
import { useStore } from '@lore/connect';
import { PayloadStates } from '@lore/utils';

export function useRequest(stateKey, request) {
  const keys = stateKey.split('.');
  const reducer = keys[0];
  const singleton = keys.length === 1;

  const store = useStore();
  const storeState = store.getState();

  if (!request) {
    return {
      request: undefined,
      saving: false,
      success: false,
      error: false
    };
  }

  if (!reducer) {
    throw new Error('reducer must be provided');
  }

  const nextRequest = singleton ? (
    storeState[reducer]
  ) : (
    storeState[reducer].byCid[request.cid]
  );

  /*
   * If the resource was deleted, it typically won't be the in store
   */

  if (
    request &&
    request.state === PayloadStates.DELETING &&
    !nextRequest
  ) {
    return {
      request: _.assign({}, nextRequest, {
        state: PayloadStates.DELETED
      }),
      saving: false,
      success: true,
      error: false
    };
  }

  // is this an error condition? Why would it ever be hit?
  if (!nextRequest) {
    return {
      request: nextRequest,
      saving: false,
      success: false,
      error: false
    };
  }

  if (
    nextRequest.state === PayloadStates.RESOLVED ||
    nextRequest.state === PayloadStates.MANAGED ||
    nextRequest.state === PayloadStates.DELETED
  ) {
    return {
      request: nextRequest,
      saving: false,
      success: true,
      error: false
    };
  }

  if (
    nextRequest.state === PayloadStates.ERROR_CREATING ||
    nextRequest.state === PayloadStates.ERROR_UPDATING ||
    nextRequest.state === PayloadStates.ERROR_FETCHING ||
    nextRequest.state === PayloadStates.ERROR_DELETING ||
    nextRequest.state === PayloadStates.NOT_FOUND
  ) {
    return {
      request: nextRequest,
      saving: false,
      success: false,
      error: true
    };
  }

  if (
    nextRequest.state === PayloadStates.CREATING ||
    nextRequest.state === PayloadStates.UPDATING ||
    nextRequest.state === PayloadStates.FETCHING ||
    nextRequest.state === PayloadStates.DELETING
  ) {
    return {
      request: nextRequest,
      saving: true,
      success: false,
      error: false
    };
  }
}

export default useRequest;
