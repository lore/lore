/**
 * Production specific settings for webpack
 *
 * This file is where you define webpack config overrides that should take place when operating under the production
 * environment. The production environment is defined as `NODE_ENV=production`.
 *
 **/

// NOTE: module.exports is used instead of "export default" because Node doesn't understand
// import/export yet, and using "export default" will break publishing tasks like "gulp surge".

module.exports = function(settings) {
  return {
    // add production specific webpack settings
  }
};
