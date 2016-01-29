const defaultOptions = {
  model: null,
  collection: null,
  actionTypes: {
    optimistic: null,
    onSuccess: null,
    onError: null
  },
  payloadStates: {
    optimistic: null,
    onSuccess: null,
    onError: null
  }
};

function hasPartialPair( handler ) {
  const hasType = !!handler.actionType;
  const hasState = !!handler.payloadState;
  return (hasType && !hasState) || (hasState && !hasType);
}

function validatePartialPairs( options ) {
  if ( hasPartialPair(options.optimistic) ) {
    throw new Error(
      'Found definition for only one of optimistic.actionType or ' +
      'optimistic.payloadState. Must define both if you define one.'
    );
  }

  if ( hasPartialPair(options.onSuccess) ) {
    throw new Error(
      'Found definition for only one of onSuccess.actionType or ' +
      'onSuccess.payloadState. Must define both if you define one.'
    );
  }

  if ( hasPartialPair(options.onError) ) {
    throw new Error(
      'Found definition for only one of onError.actionType or ' +
      'onError.payloadState. Must define both if you define one.'
    );
  }
}

function payload( model, state, error ) {
  return {
    id: model.id,
    cid: model.cid,
    state: state,
    error: error || {},
    data: model.toJSON()
  };
}

function payloadCollection( collection, state, error ) {
  return {
    state: state,
    error: error || {},
    data: collection.models.map(function( model ) {
      return payload(model, state, error);
    })
  };
}

module.exports = {
  defaultOptions,
  hasPartialPair,
  validatePartialPairs,
  payload,
  payloadCollection
};
