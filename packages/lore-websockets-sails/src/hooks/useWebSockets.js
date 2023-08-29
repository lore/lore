import React, { useContext } from 'react';

import WebSocketsContext from '../context/WebSocketsContext';

export function useWebSockets() {
  return useContext(WebSocketsContext);
}

export default useWebSockets;
