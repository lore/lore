// Throw an error when a URL is needed, and none is supplied.
module.exports = function urlError() {
  throw new Error('A "url" property or function must be specified');
};
