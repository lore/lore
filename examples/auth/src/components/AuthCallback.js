import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Auth0 from 'auth0-js';
import ShowLoadingScreen from './ShowLoadingScreen';
import auth from '../utils/auth';

export default createReactClass({
  displayName: 'AuthCallback',

  propTypes: {
    router: PropTypes.object.isRequired
  },

  componentDidMount() {
    const { router } = this.props;
    const auth0 = new Auth0.WebAuth(lore.config.auth0);

    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        auth.saveToken(authResult.idToken);
        router.push('/');
      } else if (err) {
        console.log(err);
        alert('An error occurred. See the console for more information.');
      }
    });
  },

  render() {
    return (
      <ShowLoadingScreen/>
    );
  }

});
