var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;

module.exports = function(modelName, models, options) {
  options = options || {};

  var Model = models[modelName];

  return {
    blueprint: 'create',

    model: Model,

    addCidToBody: options.addCidToBody || false,

    cidBodyAttributeName: options.cidField || 'cid',

    optimistic: {
      actionType: ActionTypes.add(modelName),
      payloadState: PayloadStates.CREATING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_CREATING,
      beforeDispatch: function(response, args){
        // no op
      }
    }
  };
};
