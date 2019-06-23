/**
 * This component serves as the root of your application.
 *
 * It is also a good place to fetch the current user. Once you have configured 'models/currentUser'
 * to fetch the current user (by pointing it to the correct API endpoint) uncomment the commented
 * out code below in order to fetch the user, display a loading experience while they're being
 * fetched, and store the user in UserContext so that components can retrieve it without
 * having to pass it down through props or extract it from the Redux store directly.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useConnect } from '@lore/connect';
import { UserContext } from '@lore/auth';
import PayloadStates from '../constants/PayloadStates';
import RemoveLoadingScreen from '../components/RemoveLoadingScreen';

export default function Master(props) {
  // const user = useConnect('currentUser');
  //
  // if (user.state === PayloadStates.FETCHING) {
  //   return null;
  // }

  return (
    <div>
      <UserContext.Provider value={null}>
        <RemoveLoadingScreen />
        {props.children}
      </UserContext.Provider>
    </div>
  );
}
