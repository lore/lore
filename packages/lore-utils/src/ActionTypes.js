import _ from 'lodash';

// todo: rename this to something like ActionTypeGenerator...

/**
 * Methods that generate ActionTypes using naming conventions. Used by action and
 * reducer blueprints.
 *
 * TODO: Since these functions generate ActionTypes, maybe rename it to
 * ActionTypeGenerator or ActionTypeFactory?
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

function formatModelName(modelName) {
  return _.snakeCase(modelName).toUpperCase();
}

export default {
  add: function(modelName) {
    return `ADD_${formatModelName(modelName)}`;
  },

  update: function(modelName) {
    return `UPDATE_${formatModelName(modelName)}`;
  },

  remove: function(modelName) {
    return `REMOVE_${formatModelName(modelName)}`;
  },

  fetch: function(modelName) {
    return `FETCH_${formatModelName(modelName)}`;
  },

  fetchPlural: function(modelName) {
    return `FETCH_${formatModelName(modelName)}S`;
  },

  refetchPlural: function(modelName) {
    return `REFETCH_${formatModelName(modelName)}S`;
  },

  reset: function(modelName) {
    return `RESET_${formatModelName(modelName)}`;
  },

  RESET_STORE: 'RESET_STORE'
};
