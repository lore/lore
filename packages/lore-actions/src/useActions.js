import React, { useContext } from 'react';

import ActionsContext from './ActionsContext';

export function useActions() {
  return useContext(ActionsContext);
}

export default useActions;
