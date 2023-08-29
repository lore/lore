import React, { useContext } from 'react';
import { Model, Collection } from '@lore/backbone';
import { PayloadStates, payload, payloadCollection } from '@lore/utils';
import { useQuery as _useQuery } from 'react-apollo-hooks';
import QueriesContext from '../contexts/QueriesContext';

function getModel(data) {
  return {
    id: data.id,
    cid: undefined,
    toJSON: function() {
      return data;
    }
  }
}

function getState(loading, error) {
  if (loading) {
    return PayloadStates.FETCHING;
  }

  if (error) {
    return PayloadStates.ERROR_FETCHING;
  }

  return PayloadStates.RESOLVED;
}

function mapEdges(data) {
  if (!data) {
    return []
  }

  return data.edges.map(function(edge) {
    return edge.node;
  })
}


export function useQuery(query, variables) {
  const { data, error, loading } = _useQuery(query, variables);

  // const model = getModel(data);
  // const collection = new Collection(data.tweets);
  const collection = new Collection(mapEdges(data.tweetsConnection));
  return payloadCollection(collection, getState(loading, error), error);
}

export default useQuery;

// function getData(data, loading, error) {
//   if (loading) {
//     return [];
//   }
//
//   if (error) {
//     return [];
//   }
//
//   return data.tweets
// }

