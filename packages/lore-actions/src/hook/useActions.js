import React, { useContext } from 'react';

import ActionsContext from '../context/ActionsContext';

export function useActions() {
  return useContext(ActionsContext);
}

export default useActions;
