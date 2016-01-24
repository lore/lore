var _ = require('lodash');

module.exports = {
  add: function(modelName) {
    return 'ADD_' + _.snakeCase(modelName).toUpperCase();
  },

  update: function(modelName) {
    return 'UPDATE_' + _.snakeCase(modelName).toUpperCase();
  },

  remove: function(modelName) {
    return 'REMOVE_' + _.snakeCase(modelName).toUpperCase();
  },

  fetch: function(modelName) {
    return 'FETCH_' + _.snakeCase(modelName).toUpperCase();
  },

  fetchPlural: function(modelName) {
    return 'FETCH_' + _.snakeCase(modelName).toUpperCase() + 'S';
  }
};
