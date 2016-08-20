var ActionTypes = require('../utils/ActionTypes');
var PayloadStates = require('../utils/PayloadStates');
var payload = require('../utils/payload');
var pluralize = require('pluralize');
var _ = require('lodash');

var SOCKET_VERBS = {
  CREATED: 'created',
  UPDATED: 'updated',
  DESTROYED: 'destroyed',
  ADDED_TO: 'addedTo'
};

module.exports = function(modelName, models) {
  var Model = models[modelName];

  return function () {
    return function (dispatch) {
      io.socket.get('/' + pluralize(modelName), function (modelData) {
        console.log('Subscribed to ' + pluralize(modelName) + '!');
      });

      io.socket.on(modelName, function (message) {
        var model = null;
        var verb = message.verb;

        if (verb === SOCKET_VERBS.CREATED) {
          model = new Model(message.data);

          // todo: replace this with a more configurable solution
          if(model.get('cid')) {
            model.cid = model.get('cid');
          }

          dispatch({
            type: ActionTypes.add(modelName),
            payload: payload(model, PayloadStates.RESOLVED)
          });
        } else if (verb === SOCKET_VERBS.UPDATED) {
          // message.previous appears to contain all the model properties
          // while message.data appears to only contain what changed
          // model = new lore.models.quote(message.previous);
          model = new Model(message.data);
          dispatch({
            type: ActionTypes.update(modelName),
            payload: payload(model, PayloadStates.RESOLVED)
          });
        } else if (verb === SOCKET_VERBS.DESTROYED) {
          model = new Model(message.previous);
          dispatch({
            type: ActionTypes.remove(modelName),
            payload: payload(model, PayloadStates.RESOLVED)
          });
        } else if (verb === SOCKET_VERBS.ADDED_TO) {
          console.log('lore:hook:websockets - association message received, but ignoring');
        } else {
          throw new Error('Unrecognized verb from sockets connection: ' + verb);
        }
      });
    };
  }
};
