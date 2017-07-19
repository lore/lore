/* global document */

import ReactDOM from 'react-dom';

function noop() {
  // does nothing
}

export default {

  renderComponentToDomElementWithId: function(domElementId, component, cb = noop) {
    // Figure out where we should be mounting the dialog on the DOM
    const node = document.getElementById(domElementId);

    // Umnount (remove) any dialog previously mounted to the DOM element
    // They only disappear when they're closed, they aren't deleted.
    // We delete the previous one to make sure we have  clean canvas and
    // that any previous dialog state is deleted (since it persists until
    // the component is removed from the DOM)
    ReactDOM.unmountComponentAtNode(node);

    // Render the dialog to the screen!
    ReactDOM.render(component, node, cb);
  }
};
