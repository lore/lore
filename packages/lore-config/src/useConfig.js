import React, { useContext } from 'react';

import ConfigContext from './ConfigContext';

export function useConfig() {
  return useContext(ConfigContext);
}

export default useConfig;
