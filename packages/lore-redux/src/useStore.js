import React, { useContext } from 'react';
import StoreContext from './StoreContext';

export function useStore(stateKey, params, options) {
  return useContext(StoreContext);
}

export default useStore;
