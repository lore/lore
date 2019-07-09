import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWebSockets } from '@lore/websockets-sails';

export default function WebSockets(props) {
  const websockets = useWebSockets();

  useEffect(() => {
    websockets.tweet.connect();
    websockets.tweet.subscribe();

    return () => {
      websockets.tweet.unsubscribe();
    }
  }, []);

  return null;
}
