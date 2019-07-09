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
import { useConfig } from '@lore/config';
import { DialogProvider } from '@lore/dialogs';
import PayloadStates from '../constants/PayloadStates';
import RemoveLoadingScreen from '../components/RemoveLoadingScreen';
import WebSockets from './WebSockets';

export default function Master(props) {
  const config = useConfig();
  const user = useConnect('currentUser');

  if (user.state === PayloadStates.FETCHING) {
    return null;
  }

  if (user.state === PayloadStates.ERROR_FETCHING) {
    return (
      <div>
        <RemoveLoadingScreen />
        <h1 className="full-page-text">
          Unauthorized
        </h1>
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <RemoveLoadingScreen />
      <WebSockets/>
      <DialogProvider
        domElementId={config.dialogs.domElementId}
        templates={config.dialogs.templates}
        defaultTemplate={config.dialogs.defaultTemplate}
      >
        {props.children}
      </DialogProvider>
    </UserContext.Provider>
  );
}
