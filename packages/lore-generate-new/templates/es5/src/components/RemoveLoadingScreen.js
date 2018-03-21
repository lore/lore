/**
 * This component removes the loading screen. It does so by adding a class to hide it,
 * and then removes it from the DOM by setting the display property to 'none'.
 **/

import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
  displayName: 'RemoveLoadingScreen',

  /*
   *  This component will remove the loading screen once it's mounted.
   */

  componentDidMount() {
    const element = document.getElementById("loading-screen");

    // As a precaution, check if the loading screen exists or if it
    // has already been hidden and stop here if either is true
    if (
      !element ||
      element.className === "loading-screen-hide"
    ) {
      return;
    }

    // Set up an event listener that will be invoked after the css
    // transition finishes; in this case, once the opacity drops
    // all the way down to 0 (it starts at 1)
    element.addEventListener("transitionend", function(event) {

      // Once the transition is done, apply a class that will set the "display"
      // property of the loading screen to "none". If you don't do this, the
      // user won't be able to interact with the main application. Alternatively,
      // you could also remove the element from the DOM via element.remove()
      element.className = "loading-screen-hide";
    }, {
      // Make sure this event listener is only invoked once
      once: true
    });

    // Apply a class to the loading screen that will cause it to fade away,
    // revealing the main application behind it
    element.className = "loading-screen-fade";
  },

  /*
   * This component doesn't render anything; it strictly exists for behavioral
   * control of the loading screen.
   */

  render() {
    return null;
  }

});
