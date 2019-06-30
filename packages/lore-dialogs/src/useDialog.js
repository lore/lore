import React, { useContext } from 'react';
import { DialogContext } from './DialogContext';

export function useDialog() {
  return useContext(DialogContext);
}

export default useDialog;
