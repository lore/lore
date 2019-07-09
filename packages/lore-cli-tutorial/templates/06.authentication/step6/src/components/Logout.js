import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import auth from '../utils/auth';
import ShowLoadingScreen from './ShowLoadingScreen';

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default function Logout(props) {
  const { history } = props;

  useEffect(() => {
    auth.deleteToken();
    history.push('/');
  }, []);

  return (
    <ShowLoadingScreen />
  );
};
