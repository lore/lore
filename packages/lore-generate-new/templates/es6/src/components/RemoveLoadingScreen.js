/**
 * This component removes the loading screen. It does so by adding a class to hide it,
 * and then removes it from the DOM by setting the display property to 'none'.
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class RemoveLoadingScreen extends React.Component {

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

    // Set up an event listener that will be invoked after the css transition
    // finishes; in this case, once the opacity drops all the way down to 0 (it
    // starts at 1)
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

    // Apply a class to the loading screen that will start the process of causing
    // it to fade away, revealing the main application behind it.
    //
    // Note about why we're using setTimeout:
    //
    // In order for CSS transitions to work, the element needs to be rendered to
    // the DOM *before* the property we want to transition away from changes. In
    // this example, we need to have the loading-screen rendered to the DOM with an
    // opacity of 1 *before* we apply a class that changes it's opacity to 0.
    //
    // But during development, when working on an unauthenticated application (such as a
    // newly generated Lore project) where the loading screen is removed during the FIRST
    // render cycle, it appears that it's actually possible for the componentDidMount()
    // method of this component to run BEFORE the loading screen is visible in the DOM, which
    // will prevent the transition from being picked up, and which will in turn mean that
    // the application will be rendered with an invisible mask that will prevent you from
    // interacting with it.
    //
    // In order to avoid the issue, we're wrapping the code that applies the "loading-screen-fade"
    // class with setTimeout(), so that we can force a delay and make sure the loading-screen
    // is visible in the DOM before we try to remove it.
    //
    // On a similar note, as of React v16, it appears that it's possible for componentDidMount()
    // to execute BEFORE that component is visible in the DOM, which can prevent CSS transitions
    // from working that are intended to be part of that component's entry behavior (such as
    // a "fade in" effect).
    //
    // The work around being used appears to be the same; wrap the transition in a setTimeout()
    // call. For more information, see this issue on GitHub:
    //
    // https://github.com/reactjs/react-transition-group/issues/216

    setTimeout(function() {
      element.className = "loading-screen-fade";
    }, 0);
  }

  /*
   * This component doesn't render anything; it strictly exists for behavioral
   * control of the loading screen.
   */

  render() {
    return null;
  }

};
