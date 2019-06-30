/* eslint prefer-rest-params: "off" */
/* eslint react/prefer-es6-class: "off" */
/* eslint no-unused-vars: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { result as _result } from '@lore/utils';
import useConnect from '../hooks/useConnect';

Connect.propTypes = {
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

export function Connect(props) {
  const {
    children,
    callback,
    ...other
  } = props;

  const values = callback(useConnect, props);
  const newProps = Object.assign({}, other, values);

  if (_.isFunction(children)) {
    return _result(children, newProps);
  }

  return React.cloneElement(children, newProps);
}

export default Connect;
