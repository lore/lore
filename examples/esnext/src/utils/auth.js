/**
 * This is a utility file you can use to store and retrieve the user token
 * if your app is using a token-based authentication strategy.
 **/

export default {

  saveToken(token) {
    localStorage.userToken = token;
  },

  hasToken() {
    return !!localStorage.userToken;
  },

  getToken() {
    return localStorage.userToken;
  },

  deleteToken() {
    delete localStorage.userToken;
  }

}
