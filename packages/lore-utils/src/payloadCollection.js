import payload from './payload';

export default function(collection, state, error, query) {
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
