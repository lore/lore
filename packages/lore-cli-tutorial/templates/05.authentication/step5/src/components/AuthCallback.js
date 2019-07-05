import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useConfig } from '@lore/config';
import Auth0 from 'auth0-js';
import auth from '../utils/auth';

export default withRouter(function AuthCallback(props) {
  const { history } = props;

  const config = useConfig();

  useEffect(() => {
    const auth0 = new Auth0.WebAuth(config.auth0);

    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        auth.saveToken(authResult.idToken);
        history.push('/');
      } else if (err) {
        console.log(err);
        alert('An error occurred. See the console for more information.');
      }
    });
  }, []);

  return null;
});
