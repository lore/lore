import React, { useContext } from 'react';

import CollectionsContext from '../context/CollectionsContext';

export function useCollections() {
  return useContext(CollectionsContext);
}

export default useCollections;
