import ActionTypes from './ActionTypes';
import PayloadStates from './PayloadStates';
import Hook from './Hook';

function payload(model, state, error) {
  return {
    id: model.id,
    cid: model.cid,
    state: state,
    error: error || {},
    data: model.toJSON()
  };
}

function payloadCollection(collection, state, error, query) {
  return {
    state: state,
    error: error || {},
    data: collection.models.map(function(model) {
      return payload(model, state, error);
    }),
    query: query,
    meta: collection.meta
  };
}

export {
  ActionTypes,
  PayloadStates,
  Hook,
  payload,
  payloadCollection
};
