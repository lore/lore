var ReactDOM = require('react-dom');

module.exports = {

  renderComponentToDomElementWithId: function(domElementId, component, cb) {
    cb = cb || function() {};

    // Figure out where we should be mounting the dialog on the DOM
    var node = document.getElementById(domElementId);

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
