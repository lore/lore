import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWebSockets } from '@lore/websockets-sails';

export default function WebSockets(props) {
  const websockets = useWebSockets();

  useEffect(() => {
    console.log('subscribing');
    websockets.tweet.connect();
    websockets.tweet.subscribe();

    return () => {
      console.log('unsubscribing');
      websockets.tweet.unsubscribe();
    }
  }, []);

  return null;
}
