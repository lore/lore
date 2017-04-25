/**
 * This is a utility file you can use to store and retrieve the user token
 * if your app is using a token-based authentication strategy.
 **/

module.exports = {

  saveToken(token) {
    localStorage.userToken = token;
  },

  hasToken: function() {
    return !!localStorage.userToken;
  },

  getToken: function() {
    return localStorage.userToken;
  },

  deleteToken: function() {
    delete localStorage.userToken;
  }

};
