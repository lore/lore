import _ from 'lodash';

/**
 * Methods that generate ActionTypes using naming conventions. Used by action and reducer
 * blueprints.
 *
 * TODO: Since these functions generate ActionTypes, maybe rename it to ActionTypeGenerator
 * or ActionTypeFactory?
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

function convertModelName(modelName) {
  return _.snakeCase(modelName).toUpperCase();
}

export default {
  add: function(modelName) {
    return `ADD_${convertModelName(modelName)}`;
  },

  update: function(modelName) {
    return `UPDATE_${convertModelName(modelName)}`;
  },

  remove: function(modelName) {
    return `REMOVE_${convertModelName(modelName)}`;
  },

  fetch: function(modelName) {
    return `FETCH_${convertModelName(modelName)}`;
  },

  fetchPlural: function(modelName) {
    return `FETCH_${convertModelName(modelName)}S`;
  }
};
