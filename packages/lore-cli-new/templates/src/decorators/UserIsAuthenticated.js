/**
 * This file a component that you can use to block access to the
 * application (or some part of it) if the user is not logged in.
 *
 * https://www.lorejs.org/anatomy/src/decorators/user-is-authenticated/
 */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export default withRouter(function UserIsAuthenticated(props) {
  const { history, children } = props;

  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    if (!authenticated) {
      // history.push('/login');
    }
  }, []);

  if (authenticated) {
    return children;
  }

  return null;
});
