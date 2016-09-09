module.exports = {

  login(token) {
    localStorage.userToken = token;
  },

  isLoggedIn: function() {
    return !!localStorage.userToken;
  },

  getToken: function() {
    return localStorage.userToken;
  },

  logout: function() {
    delete localStorage.userToken;
  }

};
