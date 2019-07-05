import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export function useUser() {
  return useContext(UserContext);
}

export default useUser;
