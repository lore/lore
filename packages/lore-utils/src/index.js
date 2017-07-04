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
    data: collection.models.map(function( model ) {
      return payload(model, state, error);
    }),
    query: query,
    meta: collection.meta
  };
}

module.exports = {
  ActionTypes: require('./ActionTypes'),
  PayloadStates: require('./PayloadStates'),
  Hook: require('./Hook'),
  payload: payload,
  payloadCollection: payloadCollection,
  defaultsDeep: require('./defaultsDeep')
};
