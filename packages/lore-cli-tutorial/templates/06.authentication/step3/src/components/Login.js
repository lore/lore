import React, { useEffect } from 'react';
import Auth0 from 'auth0-js';
import { useConfig } from '@lore/config';

export default function Login(props) {
  const config = useConfig();

  useEffect(() => {
    const auth0 = new Auth0.WebAuth(config.auth0);
    auth0.authorize();
  }, []);

  return null;
}
