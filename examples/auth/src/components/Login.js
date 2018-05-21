import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Auth0 from 'auth0-js';
import ShowLoadingScreen from './ShowLoadingScreen';

export default createReactClass({
  displayName: 'Login',

  componentDidMount() {
    const auth0 = new Auth0.WebAuth(lore.config.auth0);
    auth0.authorize();
  },

  render() {
    return (
      <ShowLoadingScreen/>
    );
  }

});
