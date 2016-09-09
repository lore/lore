var _ = require('lodash');

// todo: rename this to something like ActionTypeGenerator...

/**
 * Methods that generate ActionTypes using naming conventions. Used by action and reducer blueprints.
 * TODO: Since these functions generate ActionTypes, maybe rename it to ActionTypeGenerator or ActionTypeFactory?
 *
 * Example Usage:
 * ADD_ITEM    = ActionType.add('item')
 * UPDATE_ITEM = ActionType.update('item')
 * REMOVE_ITEM = ActionType.remove('item')
 * FETCH_ITEM  = ActionType.fetch('item')
 * FETCH_ITEMS = ActionType.fetchPlural('item')
 *
 * @returns {Object} Set of functions to generate Action Types
 */

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
  },

  RESET_STORE: 'RESET_STORE'
};
