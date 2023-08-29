/**
 * This file provides a component that you can use to block the rendering
 * of a child component the user does not have permission to interact with.
 *
 * https://www.lorejs.org/anatomy/src/decorators/user-is-authorized/
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '@lore/auth';

UserIsAuthorized.propTypes = {
  authorized: PropTypes.func.isRequired
};

export default function UserIsAuthorized(props) {
  const { authorized, children } = props;

  const user = useUser();

  if (authorized(user)) {
    return children;
  }

  return null;
};
