var ActionTypes = require('lore-utils').ActionTypes;
var PayloadStates = require('lore-utils').PayloadStates;
var payload = require('lore-utils').payload;
var uuid = require('node-uuid');
var _ = require('lodash');

module.exports =  function create(params) {
  return function(dispatch) {
    var Model = lore.models.todo;
    var model = new Model(params);
    model.cid = uuid.v4();
    model.set('cid', model.cid);

    model.save().then(function() {
      dispatch({
        type: ActionTypes.update('todo'),
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).catch(function(response) {
      var error = response.data;

      dispatch({
        type: ActionTypes.update('todo'),
        payload: payload(model, PayloadStates.ERROR_CREATING, error)
      });
    });

    return dispatch({
      type: ActionTypes.add('todo'),
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};
