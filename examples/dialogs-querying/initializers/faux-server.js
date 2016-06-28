var fauxServer = require('faux-server');

module.exports = function() {

  // Intercepts all AJAX requests and returns a mock response stored in localStorage.
  // Remove this to use a real server.
  fauxServer();

};
