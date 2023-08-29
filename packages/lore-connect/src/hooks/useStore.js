import React, { useContext } from 'react';
import StoreContext from '../contexts/StoreContext';

export function useStore(stateKey, params, options) {
  return useContext(StoreContext);
}

export default useStore;
