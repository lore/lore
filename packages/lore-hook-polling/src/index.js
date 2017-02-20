var _ = require('lodash');
var flattenObject = require('./utils/flattenObject');
var Poll = require('./Poll');

// list of actions user is polling
var actions = [];

/**
 * Generate a key that is unique for every combination of action
 * it's arguments.
 *
 * @param {String} actionName, e.g. 'tweet.find'
 * @param {Arguments} args
 * @returns {Object}
 */
function generateKey(actionName, args) {
  var key = actionName;
  var argument = null;

  for (var index = 0; index < args.length; index++) {
    argument = args[index];
    key = key + ' | ' + JSON.stringify(argument)
  }

  return key;
}

/**
 * Wrap an action with a function that allows it to be polled.
 *
 * @param {String} actionKey, e.g. 'tweet.find'
 * @param {Function} action, lore.action to be invoked
 * @param {Object} config, options to control behavior
 * @returns {Poll}
 */
function createPollingWrapper(actionKey, action, config) {
  return function callAction() {
    // Create a version of the action that is bound to the arguments provided by the
    // user. This makes sure the hook will work with any arbitrary function - it simply
    // invokes that action with the provided arguments on the requested interval
    var boundAction = Function.prototype.apply.bind(action).bind(null, null, arguments);

    // Generate a unique key for each action and set of arguments. This makes sure we'll
    // never stack polling calls up, regardless of how many times the user invokes the
    // method, e.g. lore.polling.tweet.find() will always return the same instance
    var key = generateKey(actionKey, arguments);

    // Get the existing polling instance or create a new one if it's not found
    var poll = actions[key] || new Poll(boundAction, config);
    actions[key] = poll;

    // Give the instance to the user so they can start/stop it
    return poll;
  }
}

module.exports = {

  dependencies: ['bindActions'],

  defaults: {
    polling: {
      interval: 5000,
      delayOnStart: true
    }
  },

  load: function(lore) {
    // get the actions so we can make them pollable
    var actions = lore.actions;

    // get the application level config (defaults + config/polling.js)
    var appConfig = lore.config.polling;

    // get the model specific configs
    var modelConfigs = lore.loader.loadModels();

    // create a polling object that will mirror the structure of the actions object
    lore.polling = {};

    // iterate over each action and create a pollable version attached to the polling object
    _.mapKeys(flattenObject(actions), function(action, actionKey) {
      // get the model specific config
      var modelName = actionKey.split('.')[0];
      var modelConfig = modelConfigs[modelName] || {};

      // combine values from both configs, giving priority to values in the model config
      var config = _.defaults({}, modelConfig.polling, appConfig);

      // generate the
      _.set(lore.polling, actionKey, createPollingWrapper(actionKey, action, config));
    });
  }

};
