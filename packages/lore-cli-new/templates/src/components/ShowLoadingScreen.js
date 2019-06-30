/**
 * This component shows the loading screen. It does so by removing any classes it
 * has, which will revert it back to it's default state, which is visible.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ShowLoadingScreen(props) {

  /*
   *  Show the loading screen once component is mounted.
   */
  useEffect(()=> {
    const element = document.getElementById('loading-screen');

    // As a precaution, check if the loading screen exists and stop
    // here if does not
    if (!element) {
      return;
    }

    // Remove any classes applied to the loading screen, which will revert
    // it back to it's default state of being visible
    element.className = '';
  }, []);

  /*
   * This component doesn't render anything; it strictly exists for behavioral
   * control of the loading screen.
   */

  return null;
};
