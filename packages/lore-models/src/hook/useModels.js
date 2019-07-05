import React, { useContext } from 'react';

import ModelsContext from '../context/ModelsContext';

export function useModels() {
  return useContext(ModelsContext);
}

export default useModels;
