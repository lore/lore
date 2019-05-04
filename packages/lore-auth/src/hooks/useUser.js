import React, { useContext } from 'react';
import UserContext from '../UserContext';

export function useUser() {
  return useContext(UserContext);
}

export default useUser;
