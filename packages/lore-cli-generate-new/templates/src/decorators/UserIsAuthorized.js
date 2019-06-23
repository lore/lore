/**
 * This file provides a component that you can use to block the rendering
 * of a child component that user does not have permission to interact with.
 *
 * https://www.lorejs.org/anatomy/src/decorators/user-is-authorized/
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '@lore/auth';

export default function UserIsAuthorized(props) {
  const { children } = props;

  const user = useContext(UserContext);

  const [authorized, setAuthorized] = useState(true);

  if (authorized) {
    return React.cloneElement(children, props);
  }

  return null;
};
