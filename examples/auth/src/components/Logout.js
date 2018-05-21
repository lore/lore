import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import auth from '../utils/auth';
import ShowLoadingScreen from './ShowLoadingScreen';

export default createReactClass({
  displayName: 'Logout',

  propTypes: {
    router: PropTypes.object.isRequired
  },

  componentDidMount() {
    const { router } = this.props;

    auth.deleteToken();
    router.push('/');
  },

  render() {
    return (
      <ShowLoadingScreen/>
    );
  }

});
