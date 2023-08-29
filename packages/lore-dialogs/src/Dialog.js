import React from 'react';
import PropTypes from 'prop-types';

Dialog.propTypes = {
  children: PropTypes.node.isRequired
};

export function Dialog(props) {
  const { children } = props;

  return children;
}

export default Dialog;
